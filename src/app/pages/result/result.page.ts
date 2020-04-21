import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    //TODO: Agregar lo de producto de sumas
    //TODO: Compartir circuito con una imagen
    //TODO: Guardar la captura de la imagen
    //TODO: CSS del circuito
    //TODO: Poder cambiar las variables 
  }

  f = [];
  d = [];
  indexRow = [];
  finalTable = [];
  ans = [];
  table2 = [];
  res = "";
  variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  varsUsed = [];
  suma = "";
  circuito = '';
  circuitoSafe: SafeHtml;
  vh = 0;

  ngOnInit() {
    let fP;
    let dP;
    this.activatedRoute.queryParams.subscribe(params => {
      fP = params['ms'];
      dP = params['d'];
    });

    if (fP) {
      this.f = fP.split(',');
    }
    if (dP) {
      this.d = dP.split(',');
    }
    for (let i = 0; i < this.f.length; i++) {
      this.f[i] = parseInt(this.f[i]);
    }

    for (let i = 0; i < this.d.length; i++) {
      this.d[i] = parseInt(this.d[i]);
    }
    this.reduce();
  }

  //Main function
  reduce() {


    this.f.sort((a, b) => a - b);


    let max;
    if (this.d.length) {
      max = this.f[this.f.length - 1] > this.d[this.d.length - 1] ? this.f[this.f.length - 1] : this.d[this.d.length - 1];
    } else {
      max = this.f[this.f.length - 1];
    }

    let l = max.toString(2).length;
    if (l == 1) l = 2;

    //console.log("Cantidad de 1", l);
    let table = [];
    let tMap = {};
    let map = {};

    for (let i = 0; i <= l + 1; i++) map[i] = [];

    let ones = 0;
    let union = this.f.concat(this.d).sort((a, b) => a - b);
    for (let n of union) {
      let bin = this.formatBin(n.toString(2), l);
      let row = this.Row(n, bin);
      table.push(row);
      tMap[n] = bin;
      ones = this.countOnes(bin);
      map[ones].push(row);
    }



    let indices = [];

    for (let k in map) {
      if (map[k].length) {
        //Agrupación por cantidad de 0's
        //console.log(k, map[k]);
        indices.push(k);
      }
    }



    //Empezar a comparar 
    let checkChanges = function (bin1, bin2) {
      let changes = [];
      for (let i = 0; i < bin1.length; i++) {
        if (bin1[i] != bin2[i]) {
          changes.push(i);
          if (changes.length > 1) return changes;
        }
      }
      return changes;
    }


    let changeBit = function (bin, i, newChar) {
      let ans = "";
      for (let j = 0; j < bin.length; j++) {
        if (j == i) ans += newChar;
        else ans += bin[j];
      }
      return ans;
    }


    //Tabla de implicantes primos
    let tableImp = [];
    let used = [];
    for (let i = 0; i <= indices.length - 1; i++) {

      let g1 = map[i];
      let g2 = map[i + 1];

      if (g2 != null) {
        for (let n1 of g1)
          for (let n2 of g2) {
            let bitChanges = checkChanges(n1.bin, n2.bin);
            if (bitChanges.length == 1) {
              let binImp = changeBit(n1.bin, bitChanges[0], "-");
              tableImp.push(this.Row([n1.m, n2.m], binImp));
              used.push(n1.m);
              used.push(n2.m);
            }
          }
      }
    }

    //for (let row of tableImp) console.log(row);
    let checkMarks = [];
    let mCheckeds = [];

    let map2 = {};
    for (let i = 0; i < tableImp.length - 1; i++) {
      let b1 = tableImp[i];
      for (let j = i + 1; j < tableImp.length; j++) {
        let b2 = tableImp[j];
        let newM = b1.m.concat(b2.m);
        let newMSort = newM.sort();
        if (map2[newMSort] == null) {
          let index = this.checkGuion(b1.bin, b2.bin);
          if (index != -1) {
            let bitChanges = checkChanges(b1.bin, b2.bin);
            if (bitChanges.length == 1) {
              let binImp = changeBit(b1.bin, bitChanges[0], "-");
              this.table2.push(this.Row(b1.m.concat(b2.m), binImp));
              checkMarks.push(b1.m);
              checkMarks.push(b2.m);
              mCheckeds = mCheckeds.concat(b1.m);
              mCheckeds = mCheckeds.concat(b2.m);
              map2[newMSort] = 1;

              for (let n of newMSort) {
                if (tMap["" + n] != null) {
                  tMap["" + n] = null;
                }
              }
            }
          }
        }
      }
    }
    mCheckeds = mCheckeds.sort();
    for (let r of tableImp) {
      let counter = 0;
      for (let n of r.m) {
        if (mCheckeds.indexOf(n) >= 0) counter++;
      }
      if (counter != 2) {
        this.table2.push(this.Row(r.m, r.bin));
      }
    }


    for (let k in tMap) {
      if (used.indexOf(parseInt(k)) < 0 && this.d.indexOf(parseInt(k)) < 0) {
        this.table2.push(this.Row([parseInt(k)], tMap[k]));
      }
    }


    //console.log("Final table: ");

    for (let r of this.table2) {

      let row = [];
      for (let n of this.f) {
        if (r.m.indexOf(n) >= 0) row.push(1);
        else row.push(0);
      }
      r.bin = this.buildExpression(r.bin)
      //console.log(row, r);
      this.finalTable.push(row);
    }





    //Columnas con un solo miembro
    for (let col = 0; col < this.f.length; col++) {
      let cont = 0;
      let valRow = -1;
      for (let row = 0; row < this.finalTable.length; row++) {
        if (this.finalTable[row][col] == 1) {
          cont++;
          if (cont == 1) valRow = row;
          if (cont > 1) break;
        }
      }

      if (cont == 1 && this.indexRow.indexOf(valRow) < 0) {
        //console.log("valor unico en el renglon", valRow)
        this.indexRow.push(valRow);
      }
    }



    this.indexRow.sort((a, b) => a - b);
    this.clearColumns();
    this.indexRow = [];

    //Cross columns
    for (let row = 0; row < this.finalTable.length; row++) {
      var sumRow = this.sum(this.finalTable[row]);
      if (sumRow > 1) {
        for (let col = 0; col < this.finalTable[row].length; col++) {
          if (this.finalTable[row][col]) {
            //Revisar si cruza
            let sumCol = 0;
            for (let row2 = 0; row2 < this.finalTable.length; row2++) {
              if (this.finalTable[row2][col]) sumCol++;
            }
            if (sumCol > 1) {
              //Cruce de columnas
              this.indexRow.push(row);
              break;
            }
          }
        }
        this.clearColumns();
        this.indexRow = [];
      }
    }

    //Columnas solitarias
    for (let col = this.f.length - 1; col >= 0; col--) {
      for (let row = this.finalTable.length - 1; row >= 0; row--) {
        if (this.finalTable[row][col] == 1) {
          this.indexRow.push(row);
          break;
        }
      }
    }

    this.clearColumns();
    this.suma = this.ans.join(" + ");
    this.suma = this.eraseChar(this.suma, ',');
    this.varsUsed.sort();
    let aux = [];
    for (let v of this.varsUsed) {
      aux.push(v);
      aux.push(v + "'");
    }
    this.varsUsed = [].concat(aux);

    let body = "";
    let altura = 0;
    let conectoresOr = ""; //Conectores que van del OR al AND
    let medio;
    let isImpar = this.ans.length % 2 != 0;
    if(isImpar)medio = (this.ans.length+1)/2;
    else  medio = this.ans.length/2;
    console.log("El medio es", medio)
    let saltosSalidaOr = 0;
    let widthSalidasOr = 64;
    let leftVerticalLine = 380;
    let topVerticalLine = 70;
    let widthInputAnd = 51;
    this.vh = this.ans.length*150;
    let topAnd = ((this.vh)/2)-55;//Altura del canva sobre 2 menos 55
    let heightVerticalLine = topAnd-(this.ans.length*10);

    for (let i in this.ans) {
      let item = this.ans[i];
      let index = parseInt(i);
      if(index == medio){
        widthSalidasOr += 4;
      }
      body += this.buildVars(altura, item);
      conectoresOr += `<div style="position: absolute; top: ${saltosSalidaOr+70}px; left: 316px;background-color: black;width: ${widthSalidasOr}px; height: 2px;"></div>`;
      if (index < medio) {
        //conectoresOr += `<div style="position: absolute; top: ${topVerticalLine+heightVerticalLine}px; left: ${leftVerticalLine}px;background-color: black;width: ${widthInputAnd}px; height: 2px;"></div>`
        console.log("Antes del medio",index,":",medio);
        
        widthSalidasOr -= 4;
        topVerticalLine += 150;
        leftVerticalLine -= 4;
        heightVerticalLine -= 141 + index;
        widthInputAnd += 4;
       
      }
      else {
        
        topVerticalLine += heightVerticalLine+5;
        leftVerticalLine += 4;

       //conectoresOr += `<div style="position: absolute; top: ${topVerticalLine+heightVerticalLine}px; left: ${leftVerticalLine}px;background-color: black;width: ${widthInputAnd}px; height: 2px;"></div>`
       
        widthSalidasOr += 4;
        topVerticalLine += 8;
        heightVerticalLine += 143;
        widthInputAnd -= 4;
       if(index == medio){
          topVerticalLine -= 150;
        }
        
        
      }
      saltosSalidaOr += 150;
      altura += 150;
    }
       
    console.log("Conectores", conectoresOr);
    let and = ""
    leftVerticalLine -= 80; 
    if (this.ans.length > 1) {
      and = `
      <div style="position: absolute; top: ${topAnd}px; left: ${leftVerticalLine}px;width: 200px; height: 100px; background-color: black; border: 0px solid black; border-radius: 100px / 50px;"></div>
      <div style="position: absolute; top: ${topAnd-10}px; left: ${leftVerticalLine}px;width: 120.0px; height: 120.0px; background-color: #eaeef1; border: 0px solid black; border-radius: 50px;border: 0px solid white;"></div>
      <div style="position: absolute; top: ${topAnd+50}px; left: 467px;background-color: black;width: 80px; height: 2px;"></div>
      ${conectoresOr}
      `;
    }

    this.circuito = `
    <div style="padding-top: 20px; padding-bottom: 20px; border: 0px solid black;">
    
    <div style="position: relative;top: 0px;left: 0px;width: 449px; height: 300px;border: 0px solid black;">
      
      ${and}
      ${body}
    
    </div>
  </div>

    `;

    this.circuitoSafe = this.sanitizer.bypassSecurityTrustHtml(this.circuito);
  }

  eraseChar(s, c) {
    while (s.indexOf(c) >= 0) {
      s = s.replace(c, '');
    }
    return s;
  }

  buildVars(top, item) {
    let px = 0;
    let left = 5;
    let res = "";
    let lines = "";
    let lenItem = item.length;
    let topLineMain = top+40;
    for (let v of this.varsUsed) {

      if (v.length == 2) {
        res += `<div style="position: absolute; top: ${top}px; left: ${px}px; text-color: black;text-decoration: overline;">${v[0]}</div>`;
      }
      else {
        res += `<div style="position: absolute; top: ${top}px; left: ${px}px; text-color: black;">${v}</div>`;
      }



      px += 20;
      res += `<div style="position: absolute; top: ${top + 20}px; left: ${left}px;width: 2px; height: 100px; background-color: black; "></div>`
      left += 20;
      if (item.indexOf(v) >= 0) {
        let index = this.varsUsed.indexOf(v) + 1;

        let topLine = top + 20 + index * 15;
        let leftLine = (index - 1) * 20;
        let lineWith = (55) * (this.varsUsed.length / 2) - leftLine + 5 + (lenItem == 1 ? 40 : 0);
        console.log("Item", item, "Si esta en ", v, "index", index, 'topLine', topLine, 'leftLine', leftLine, 'lineWith', lineWith);


        let topPoint = topLineMain-3;
        let leftPoint = leftLine - 3;



        lines += `
        <div style="position: absolute; top: ${topLineMain}px; left: ${leftLine + 5}px;width: ${lineWith}px; height: 2px;background-color: black;"></div>
        <div
          style="position: absolute; top: ${topPoint}px; left: ${leftPoint + 5}px;width: 8px; height: 8px;border-radius: 4px;background-color: black;">
        </div>
        `;
        topLineMain += 25;
      }
      

    }
    let width = 55 * this.varsUsed.length / 2;
    res += `
      ${lines}
    `;

    if (lenItem > 1) {
      res += ` <div
      style="position: absolute; top: ${top + 20}px; left: ${width}px;width: 100px; height: 100px; background-color: black; border: 0px solid black; border-radius: 50px; border-right-width: 0px;">
    </div>
    <div
      style="position: absolute; top: ${top + 20}px; left: ${width}px;width: 50px; height: 100px; background-color: black; border: 0px solid black; border-right-width: 0px;color: #111111;font-size:xx-small;">
    
    </div>`;
    }
    return res;
  }

  formatBin(bin, n) {
    while (bin.length < n) {
      bin = "0" + bin;
    }
    return bin;
  }

  drawAnd() {
    return `
        <div style="position: absolute; top: 170px; left: 221px;width: 200px; height: 100px; background-color: black; border: 0px solid black; border-radius: 100px / 50px;"></div>
        <div style="position: absolute; top: 160.0px; left: 221px;width: 120.0px; height: 120.0px; background-color: #eaeef1; border: 0px solid black; border-radius: 50px;border: 0px solid white;"></div>
        <div style="position: absolute; top: 219px; left: 421px;background-color: black;width: 50px; height: 2px;"></div>
        <div style="position: absolute; top: 206.0px; left: 417.0px;width: 0px; height: 0px; border-top: 14.0px solid #eaeef1; border-left: 10.0px solid black;border-bottom: 14.0px solid #eaeef1;"></div>
    `;
  }


  Row(m, bin) {
    return { m, bin };
  }

  sum(arr) {
    var ans = arr.reduce(function (a, b) {
      return a + b;
    }, 0);
    return ans;
  }

  buildExpression(bin) {
    let res = [];
    for (let i = 0; i < bin.length; i++) {
      if (this.varsUsed.indexOf(this.variables[i]) < 0) {
        this.varsUsed.push(this.variables[i]);
      }
      if (bin[i] == "1") res.push(this.variables[i]);
      else if (bin[i] == "0") res.push(this.variables[i] + "'");
    }
    return res;
  }

  countOnes(bin) {
    let res = 0;
    for (let c of bin) if (c == '1') res++;
    return res;
  }

  checkGuion(b1, b2) {
    for (let i = 0; i < b1.length; i++) {
      if (b1[i] == "-" && b1[i] == b2[i]) return i;
    }
    return -1;
  }


  clearColumns() {
    for (let index of this.indexRow) {
      for (let i = 0; i < this.finalTable[index].length; i++) {
        let bit = this.finalTable[index][i];
        if (bit) {
          //Limpiar columna i
          for (let j = 0; j < this.finalTable.length; j++) {
            if (this.finalTable[j][i]) this.finalTable[j][i] = 0;
          }
        }
      }
      //console.log(this.finalTable);
      let ex = this.table2[index].bin;

      this.ans.push(ex);
    }
    this.indexRow = [];

  }








}
