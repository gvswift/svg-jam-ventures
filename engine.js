let baseIDRate, baseETRate, baseCSCRate, baseVATRate, baseSurcharge, baseVATBase =0
let age_factor, engineSizeFactor, cifFactor, seating_capacity_factor, classification_factor, specialPurposeFactor = 0;
let idAmount, etAmount, cscAmount, vatAmount, surchargeAmount, cifec, totalDuties= 0;
let id_w, et_w, csc_w, vs_w, vat_w, option ;


let _date = new Date();
let stringDate = _date.toString();
let theDate = stringDate.slice(0,15);
  // let __date =  document.getElementById("dateL");
  // __date.value = theDate;
   document.getElementById("datelabel").innerHTML = theDate;

   let title = document.getElementById("titlelabel");
   title.style.textAlign="center";

const moneyfm = new Intl.NumberFormat("en-VC", {style:"currency", currency: "XCD"});

function getTotal() { 
  let CIF = document.getElementById("cif");
  
  if(currency.value === "" || terms.value === "" || document.getElementById("fob").value === ""){
        alert("Please insert appropriate value information!");
        if(document.getElementById("fob").value === ""){
              document.getElementById("fob").focus();
        } else if(document.getElementById("currency").value === ""){
              document.getElementById("currency").focus();
        } else{
              document.getElementById("terms").focus();
        }
  } else{
        if(currency.value === "xcd"){
              if(terms.value === "cif"){
                    let fob =Number(document.getElementById('fob').value) * 1.00;
                    cifec = fob ;
              }
              else if(terms.value ==="cfr"){
                    let fob =Number(document.getElementById('fob').value) * 1.00;
                    let ins = Number(document.getElementById('ins').value) * 1.00;
                    cifec = fob + ins;

              }
              else{
                    let fob =Number(document.getElementById('fob').value) * 1.00;
                    let frt = Number(document.getElementById('frt').value) * 1.00;
                    let ins = Number(document.getElementById('ins').value) * 1.00;
                    cifec = fob  + frt + ins;
              }
        }
        else{
              if(terms.value === "cif"){
                    let fob =Number(document.getElementById('fob').value) * 2.717;
                    cifec = fob ;
              }
              else if(terms.value ==="cfr"){
                    let fob =Number(document.getElementById('fob').value) * 2.717;
                    let ins = Number(document.getElementById('ins').value) * 2.717;
                    cifec = fob + ins;
              }
              else{
                    let fob =Number(document.getElementById('fob').value) * 2.717;
                    let frt = Number(document.getElementById('frt').value) * 2.717;
                    let ins = Number(document.getElementById('ins').value) * 2.717;
                    cifec = fob  + frt + ins;
              }
        }

  }
 // CIF.value = "$" + " " + cifec.toFixed(2);
 CIF.value = moneyfm.format(cifec);

}


document.getElementById("fob").addEventListener("keydown",e=>{
    if(e.keyCode === 13){
          const fobv = Number(document.getElementById("fob").value);
          fob.value = fobv.toFixed(2) ;
          if(terms.value === "cif"){
                document.getElementById("total_button").focus();
          } else if (terms.value ==="cfr"){
                document.getElementById("ins").focus();
          }else {
                document.getElementById("frt").focus();
          }
    }
})

document.getElementById("frt").addEventListener("keydown", e =>{
if(e.keyCode === 13){
  let frtv = Number(document.getElementById("frt").value);
frt.value = frtv.toFixed(2);
document.getElementById("ins").focus();
}
})

document.getElementById("terms").addEventListener("change",e =>{
  document.getElementById("cif").value = "";
})

document.getElementById("currency").addEventListener("change",e=>{
  document.getElementById("cif").value = "";
})

function termsFN(){
if(terms.value === "cif"){
    document.getElementById("frt").disabled = true;
    document.getElementById("ins").disabled = true;
    document.getElementById("frt").value = "";
    document.getElementById("ins").value = "";
    document.getElementById("cif").value = "";
}
else if(terms.value === "cfr"){
  document.getElementById("frt").disabled = true;
  document.getElementById("ins").disabled = false;
  document.getElementById("frt").value = "";

}
else{
  document.getElementById("fob").disabled = false;
  document.getElementById("frt").disabled = false;
  document.getElementById("ins").disabled = false;
}
}

document.getElementById("ins").addEventListener("keydown", e =>{
if(e.keyCode === 13){
  let insv = Number(document.getElementById("ins").value);
ins.value = insv.toFixed(2);
  document.getElementById("total_button").focus();
}
})

 function resetValues(){
  const valueInput= document.querySelectorAll(".value_Input");
  valueInput.forEach((e)=>{
    e.value = "";
  })
  document.getElementById("fob").disabled = false;
  document.getElementById("frt").disabled = false;
  document.getElementById("ins").disabled = false;
 }  

 function resetSpecs() {
 let specsInput = document.querySelectorAll(".specs_Inp");
  specsInput.forEach((b)=>{
    b.value = "";
  })
  resetAllDuties();
  }

 document.getElementById("make").addEventListener("keydown",e =>{
  if(e.keyCode === 13){
     let makeUp = document.getElementById("make").value;
    make.value = makeUp.toUpperCase();
    document.getElementById("model").focus();
  }
 })

  document.getElementById("model").addEventListener("keydown",e =>{
  if(e.keyCode === 13){
     let modelUp = document.getElementById("model").value;
    model.value = modelUp.toUpperCase();
    document.getElementById("chassis").focus();
  }
 })

 document.getElementById("chassis").addEventListener("keydown",e =>{
  if(e.keyCode === 13){
     let chassisUp = document.getElementById("chassis").value;
    chassis.value = chassisUp.toUpperCase();
    document.getElementById("year").focus();
  }
 })

 document.getElementById("year").addEventListener("keydown",e =>{
  if(e.keyCode === 13){
    let thisYear = Number(_date.getFullYear());    
    let vehicleYear = Number(document.getElementById("year").value);
    if(vehicleYear > thisYear) {
      alert("Invalid Data!");
      year.value = "";
      document.getElementById("year").focus();
    } else{
          let vehicleAge = thisYear-vehicleYear;
          if(vehicleAge > 12) {
             alert("Invalid data!");
             alert("Vehicle cannot be over 12 years.");
             year.value = "";
             document.getElementById("year").focus();
          } else {
                 age.value = vehicleAge;

                 document.getElementById("hs").value = "select";
                 resetAllDuties();
                 document.getElementById("source").focus();
                  }
          }
 }})

 document.getElementById("source").addEventListener("change",e =>{
     document.getElementById("hs").value = "select";
     resetAllDuties();
     document.getElementById("cc_s").focus();
  
 })

 document.getElementById("cc_s").addEventListener("keydown",e =>{
  if(e.keyCode === 13){
    document.getElementById("hs").value = "";
     document.getElementById("hs").focus();
     resetAllDuties();
  }
 })


 document.getElementById("seats").addEventListener("keydown", e =>{
  if(e.keyCode === 13){
    document.getElementById("hs").value = "";
    resetAllDuties();
    document.getElementById("hs").focus();
  }
 })

 document.getElementById("weight").addEventListener("keydown", e =>{
  if(e.keyCode === 13){
    document.getElementById("hs").value = "";
    resetAllDuties();
    document.getElementById("hs").focus();
  }
 })

 document.getElementById("options").addEventListener("change", e =>{
  
    document.getElementById("hs").value = "";
    resetAllDuties();
    document.getElementById("hs").focus();
  
 });
document.getElementById("reset_Duties").addEventListener("onclick",e =>{

     document.getElementById("hs").focus();
  
 });
 
 function resetAllDuties(){
  const w_duty = document.querySelector(".waiver");
  w_duty.checked =false;
  document.getElementById("hs").value = "";
  const duties =document.querySelector(".duty");
  const allInput = duties.querySelectorAll("input");
  allInput.forEach((e)=>{
    e.value="";
  });
  
  }

function resetAmounts(){
      document.getElementById("iduty_Amount").value = "" ;
      document.getElementById("etax_Amount").value = "";
      document.getElementById("csc_Amount").value = "";
      document.getElementById("vs_Amount").value = "";
      document.getElementById("vat_Amount").value = "" ;
  
      document.getElementById("total_DutiesInp").value = "" ;
}


function heading_Duty(){
     // baseSurcharge = 0;
      
      let c_value = document.getElementById("cif").value;
      let hd =document.getElementById("hs").value;
      let seating =Number(document.getElementById("seats").value);
      let vage =document.getElementById("age").value;
      let cc =Number(document.getElementById("cc_s").value);
      let tons =Number(document.getElementById("weight").value);
      let option =document.getElementById("options").value;
      let v_source =document.getElementById("source").value;

      //resetAllDuties();
      
      if(hd ==="8701"){
            if(vage === "" || c_value === ""){
                  alert("Customs value and Vehicle age are required for heading 8701.");
                  console.log(hd);
                  hs.value = "";
                  resetAllDuties();
                  document.getElementById("year").focus();
                  console.log(cifec);

            }else if(v_source === "dumper"){
                  alert(`Dumper does not belong to \"8701\". Please try \"8704\". 
You may also choose another 'source'. `);
                  hs.value = "";
                  resetAllDuties();
                  document.getElementById("source").focus();


            }else{baseIDRate = 5;
                  baseETRate = 35.00;
                  baseCSCRate = 6.00;
                  baseVATBase = (cifec *baseIDRate/100) + (cifec *baseETRate/100) + (cifec * baseCSCRate/100) +
                        cifec;
                  baseVATRate = 16.00;

                  document.getElementById("iduty_Rate").value = baseIDRate +"%";
                  document.getElementById("etax_Rate").value = baseETRate +"%";
                  document.getElementById("csc_Rate").value = baseCSCRate + "%";
                  document.getElementById("vat_Rate").value = baseVATRate +"%";
                  document.getElementById("vb_Amount").value = moneyfm.format(baseVATBase); //baseVATBase.toFixed(2);
                  document.getElementById("vs_Amount").value = "";

                  resetAmounts();


            }   
      }else if(hd ==="8702"){
            if(seating < 10 || vage === "" || c_value === ""){
                  alert("Customs value ,Vehicle age and seating capacity are required for heading 8702.");
                  resetAllDuties();
                  document.getElementById("seats").focus();
                  console.log(cifec);

            }else if(v_source === "dumper"){
                  alert(`Dumper does not belong to \"8702\". Please try \"8704\". 
You may also choose another 'source'. `);
                  hs.value = "";
                  resetAllDuties();
                  document.getElementById("source").focus();


            }else{baseIDRate = 10.00;
                  baseETRate = 35.00;
                  baseCSCRate = 6.00;
                  baseVATBase = (baseIDRate * cifec/100) + (baseETRate*cifec/100) + (baseCSCRate*cifec/100) +   
                        cifec;
                  baseVATRate = 16.00;

                  document.getElementById("iduty_Rate").value = baseIDRate +"%";
                  document.getElementById("etax_Rate").value = baseETRate +"%";
                  document.getElementById("csc_Rate").value = baseCSCRate + "%";
                  document.getElementById("vat_Rate").value = baseVATRate +"%";
                  document.getElementById("vb_Amount").value = moneyfm.format(baseVATBase); //baseVATBase.toFixed(2);

                  resetAmounts();

                  calculateSurcharge();

            }
      }else if (hd === "8703"){
            if(vage === "" || c_value === "" || v_source === "" || cc < 0){
                  alert("Customs value, vehicle age, power source and cc's are required for heading 8703.");
                  hs.value = "";
                  resetAllDuties();
                  document.getElementById("cc_s").focus();

            }else if(v_source === "dumper"){
                  alert(`Dumper does not belong to \"8703\". Please try \"8704\". 
You may also choose another 'source'. `);
                  hs.value = "";
                  resetAllDuties();
                  document.getElementById("source").focus();

            }else{
                  if(v_source === "electric"){
                        baseIDRate = 20.00;
                        baseETRate = 20.00;
                        baseCSCRate = 6.00;
                        baseVATBase = (baseIDRate * cifec/100) + (baseETRate*cifec/100) + (baseCSCRate*cifec/100) +
                        cifec;
                        baseVATRate = 16.00;

                  }else if(v_source === "other"){
                        baseIDRate = 30.00;
                        baseETRate = 30.00;
                        baseCSCRate = 6.00;
                        baseVATBase = (baseIDRate * cifec/100) + (baseETRate*cifec/100) + (baseCSCRate*cifec/100) +
                         cifec;
                        baseVATRate = 16.00;

                  }else{
                        let cci = (ccs) => ccs <= cc;

                        if(v_source === "gas"){
                              let x = ccs_8703_gas.findLastIndex(cci); 
    
                              baseIDRate = gas_8703_Rates[x][1];
                              baseETRate = gas_8703_Rates[x][2];
                              baseCSCRate = 6.00;
                              baseVATBase = (baseIDRate * cifec/100) + (baseETRate*cifec/100) +
                                             (baseCSCRate*cifec/100) + cifec;
                              baseVATRate = 16.00;
                              
                        }else if(v_source === "diesel"){           
                              let x = ccs_8703_diesel.findLastIndex(cci);
                    
                              baseIDRate = diesel_8703_Rates[x][1];
                              baseETRate = diesel_8703_Rates[x][2];
                              baseCSCRate = 6.00;
                              baseVATBase = (baseIDRate * cifec/100) + (baseETRate*cifec/100) + 
                                            (baseCSCRate*cifec/100) + cifec;
                              baseVATRate = 16.00;
                                   
                        }  
                  }
                  document.getElementById("iduty_Rate").value = baseIDRate +"%";
                  document.getElementById("etax_Rate").value = baseETRate +"%";
                  document.getElementById("csc_Rate").value = baseCSCRate + "%";
                  document.getElementById("vat_Rate").value = baseVATRate +"%";
                  document.getElementById("vb_Amount").value = moneyfm.format(baseVATBase); //baseVATBase.toFixed(2);

                  resetAmounts();

                  calculateSurcharge();

            }  
      }else if (hd === "8704"){
            if(vage === "" || cifec === 0 || tons <= 0 || v_source === ""){
                  alert("Customs value, vehicle age, power source and tonnage are required for heading 8704.");
                  hs.value = "";
                  resetAllDuties();
                  document.getElementById("weight").focus();
                  console.log(hs.value);

            }else{
                  if(v_source ==="electric"){
                        baseIDRate = 10.00;
                        baseETRate = 30.00;
                        baseCSCRate = 6.00;
                        baseVATBase = (baseIDRate * cifec/100) + (baseETRate*cifec/100) + 
                              (baseCSCRate * cifec/100) + cifec;
                        baseVATRate = 16.00;
    
                  } else if (v_source === "other") {
                        baseIDRate = 10.00;
                        baseETRate = 60.00;
                        baseCSCRate = 6.00;
                        baseVATBase = (baseIDRate * cifec/100) + (baseETRate*cifec/100) + (baseCSCRate*cifec/100) +
                           cifec;
                        baseVATRate = 16.00;

                  }else{
                        let ti = (ton) => ton <= tons;

                        if (v_source === "gas"  || v_source === "diesel"){
                              let t = tonnage_8704.findLastIndex(ti);
         
                              baseIDRate = gasOrDiesel8704_Rates[t][1];
                              baseETRate = gasOrDiesel8704_Rates[t][2];
                              baseCSCRate = 6.00
                              baseVATBase = (baseIDRate * cifec/100) + (baseETRate  * cifec/100) + 
                                          (baseCSCRate * cifec/100) + cifec;
                              baseVATRate = 16.00
         
                        } else if (v_source === "dumper"){
                              let d = dumper_8704.findLastIndex(ti);
         
                              baseIDRate = dumper8704_Rates[d][1];
                              baseETRate = dumper8704_Rates[d][2];
                              baseCSCRate = 6.00
                              baseVATBase = (baseIDRate * cifec/100) + (baseETRate  * cifec/100) +
                                           (baseCSCRate  * cifec/100) +  cifec;
                              baseVATRate = 16.00
                        
                        }
                  }
                  document.getElementById("iduty_Rate").value = baseIDRate +"%";
                  document.getElementById("etax_Rate").value = baseETRate +"%";
                  document.getElementById("csc_Rate").value = baseCSCRate + "%";
                  document.getElementById("vat_Rate").value = baseVATRate +"%";
                  document.getElementById("vb_Amount").value = moneyfm.format(baseVATBase); //baseVATBase.toFixed(2);

                  resetAmounts();

                  calculateSurcharge();
            }
      } else if (hd === "8705"){
            if(vage < 0 || c_value === "" || option === ""){
                  alert("Customs value, vehicle age and an option are required for heading 8705.");
                  hs.value = "";
                  resetAllDuties();
                  document.getElementById("options").focus();
                  console.log(hs.value);

            }else if(v_source === "dumper"){
                  alert(`Dumper does not belong to \"8705\". Please try \"8704\". 
You may also choose another 'source'. `);
                  hs.value = "";
                  resetAllDuties();
                  document.getElementById("source").focus();

            }else{
                  if (option === "fire_fighting") {
                        baseIDRate = 0
                        baseETRate = 0
                        baseCSCRate = 6.00
                        baseVATBase = (baseIDRate * cifec/100) + (baseETRate  * cifec/100) +
                                      (baseCSCRate  * cifec/100) +  cifec;
                        baseVATRate = 16.00
    
                  } else {
                        baseIDRate = 5.00
                        baseETRate = 0
                        baseCSCRate = 6.00
                        baseVATBase = (baseIDRate * cifec/100) + (baseETRate  * cifec/100) +
                                      (baseCSCRate  * cifec/100) +  cifec;
                        baseVATRate = 16.00

                  }
                  document.getElementById("iduty_Rate").value = baseIDRate +"%";
                  document.getElementById("etax_Rate").value = baseETRate +"%";
                  document.getElementById("csc_Rate").value = baseCSCRate + "%";
                  document.getElementById("vat_Rate").value = baseVATRate +"%";
                  document.getElementById("vb_Amount").value = moneyfm.format(baseVATBase); //baseVATBase.toFixed(2);

                  resetAmounts();

                  calculateSurcharge();
            }
    }
   
    
    }
  



  function calculateSurcharge(){
    let hd = document.getElementById("hs").value;
    let cc = Number(document.getElementById("cc_s").value);
    let v_age = document.getElementById("age").value;
    let v_source = document.getElementById("source").value;
    let tonnage = Number(document.getElementById("weight").value);
    let seating = Number(document.getElementById("seats").value);
    let option = document.getElementById("options").value;

    if(hd === "8701"){
      baseSurcharge = 0;

    }
    else if(hd === "8702") {
      let ageindex = (age) => age <= v_age;
      let a = age_8702_8704.findLastIndex(ageindex);

      let s_index = (seats) => seats <= seating;
      let s = seating_8702.findLastIndex(s_index);

      let cifindex = (cif) => cif <= cifec;
      let c = cif_8702_8704.findIndex(cifindex);

      age_factor = age_factors_8702_8704[a][1];
      seating_capacity_factor = seating_factors_8702[s][1];
      cifFactor = cif_matrix_8702[c][a];

      baseSurcharge = surcharge_base * age_factor * seating_capacity_factor * cifFactor;

      alert(`Base Surcharge :${surcharge_base}
Age Factor: ${age_factor}
Seating Capacity Factor: ${seating_capacity_factor}
CIF Factor : ${cifFactor}`);

    } else if(hd=== "8703"){
        let ageindex = (age) => age <= v_age; 
        let a = age_8703.findLastIndex(ageindex);

        let cifindex = (cif) => cif <= cifec; 
        let ci = cif_8703.findIndex(cifindex); 
      
        cifFactor = cif_matrix_8703[ci][a]; 
       
        if(v_source === "gas" || v_source === "diesel") {
              let ccindex = (ccs) => ccs <= cc; 
              let c = ccs_8703_forESFactor.findLastIndex(ccindex);

              engineSizeFactor = engineSize_factors_8703[c][1];

              age_factor = age_factors_8703[a][1]; 

              baseSurcharge = surcharge_base * age_factor * engineSizeFactor * cifFactor;

              alert(`Base Surcharge :${surcharge_base}
Age factor :${age_factor}
Engine Size Factor :${engineSizeFactor}
CIF Factor :${cifFactor}`);

        } else if (v_source === "electric") {
              let r_index = (rnge) => rnge <= cc; 
              let c = rangeForRangeFactor.findIndex(r_index);

              range_factor = rangeFactors8703[c][1]; 
              age_factor = ageFactors_8703_electric[a][1];

              baseSurcharge = surcharge_base * age_factor * range_factor * cifFactor;

              alert(`Base Surcharge : ${surcharge_base}
Age Factor :${age_factor}
Range Factor :${range_factor}
CIF Factor :${cifFactor} `);

        } else if (v_source === "other") {
            classification_factor = 1.00;
            age_factor = ageFactors_8703_electric[a][1];

            baseSurcharge = surcharge_base * age_factor * classification_factor * cifFactor;

            alert(`Base Surcharge :${surcharge_base}
Age Factor :${age_factor}
Classification Factor :${classification_factor}
CIF Factor :${cifFactor}`);

        }
    } else if (hd === "8704") {
      let ageindex = (age) => age <= v_age;
      let a = age_8702_8704.findLastIndex(ageindex);

      let t_index = (tons) => tons <= tonnage;
      let t = tonnage_8704_vs.findLastIndex(t_index);

      let cifindex = (cif) => cif <= cifec;
      let c = cif_8702_8704.findIndex(cifindex);

      age_factor = age_factors_8702_8704[a][1];
      tonnage_factor = tonnage_factors_8704[t][1];
      cifFactor = cif_matrix_8704[c][a];

      baseSurcharge = surcharge_base * age_factor * tonnage_factor * cifFactor;

      alert(`Base Surcharge :${surcharge_base}
Age Factor :${age_factor}
Tonnage Factor :${tonnage_factor}
CIF Factor :${cifFactor}`);


    } else if (hd === "8705") {
        if (option === "fire_fighting"){
          let ageindex = (age) => age <= v_age;
          let a = age_8705.findLastIndex(ageindex);
    
          let cifindex = (cif) => cif <= cifec;
          let c = cif_8705.findIndex(cifindex);
    
          age_factor = age_factors_8705[a][1];
          specialPurposeFactor = " None" //there is no special purpose factor
          cifFactor = cif_matrix_8705[c][a];

          baseSurcharge = surcharge_base * age_factor * cifFactor;

          console.log(engineSizeFactor);
          alert(`Base Surcharge :${surcharge_base}
Age Factor :${age_factor}
Special Purpose Factor :${specialPurposeFactor}
CIF Factor :${cifFactor}`);

    
        } else {
      let ageindex = (age) => age <= v_age;
      let a = age_8705.findLastIndex(ageindex);

      let cifindex = (cif) => cif <= cifec;
      let c = cif_8705.findIndex(cifindex);

      age_factor = age_factors_8705[a][1];
      specialPurposeFactor = 1.00
      cifFactor = cif_matrix_8705[c][a];

      baseSurcharge = surcharge_base * age_factor * specialPurposeFactor * cifFactor;

      alert(`Base Surcharge :${surcharge_base}
Age Factor :${age_factor}
Special Purpose Factor :${specialPurposeFactor}
CIF Factor :${cifFactor}`);

    }



    }
   
    document.getElementById("vs_Amount").value = baseSurcharge.toFixed(2);

console.log(baseSurcharge);
  
  }


  function calculateDuties(){
      apply_Waiver();

    let idRate = document.getElementById("iduty_Rate").value;
    const IDRATE = Number(idRate.substr(0,idRate.length-1))/100;
    
    let etRate = document.getElementById("etax_Rate").value;
    const ETRATE = Number(etRate.substr(0,etRate.length-1))/100;
  
  let cscRate = document.getElementById("csc_Rate").value;
    const CSCRATE =Number(cscRate.substr(0,cscRate.length-1))/100;
    
  let vatRate = document.getElementById("vat_Rate").value;
    const VATRATE = Number(vatRate.substr(0,vatRate.length-1))/100;

    idAmount = cifec * IDRATE;
    etAmount = cifec *ETRATE ;
    cscAmount = cifec * CSCRATE;
    vatAmount = baseVATBase * VATRATE;

    document.getElementById("iduty_Amount").value = idAmount.toFixed(2);
    document.getElementById("etax_Amount").value = etAmount.toFixed(2);
    document.getElementById("csc_Amount").value = cscAmount.toFixed(2);
    document.getElementById("vat_Amount").value = vatAmount.toFixed(2);
       
    const  ID = Number( document.getElementById("iduty_Amount").value) ;
    const ET = Number(document.getElementById("etax_Amount").value);
    const CSC = Number(document.getElementById("csc_Amount").value);
    const VS = Number(document.getElementById("vs_Amount").value);
    const VAT = Number(document.getElementById("vat_Amount").value) ;

    totalDuties = ID + ET + CSC + VS + VAT;

    document.getElementById("total_DutiesInp").value = moneyfm.format(totalDuties); //totalDuties.toFixed(2);
      
  }

  
  document.getElementById("iduty_Waiver").addEventListener("keydown", e =>{
      if(e.keyCode === 13){
        document.getElementById("etax_Waiver").focus();

      }
     })

     document.getElementById("etax_Waiver").addEventListener("keydown", e =>{
      if(e.keyCode === 13){
        document.getElementById("csc_Waiver").focus();

      }
     })

     document.getElementById("csc_Waiver").addEventListener("keydown", e =>{
      if(e.keyCode === 13){
        document.getElementById("vs_Waiver").focus();

      }
     })


     document.getElementById("vs_Waiver").addEventListener("keydown", e =>{
      if(e.keyCode === 13){
         document.getElementById("vat_Waiver").focus();
         
      }
     })

     function apply_Waiver(){
      id_w = document.getElementById("iduty_Waiver").value;
      et_w = document.getElementById("etax_Waiver").value;
      csc_w = document.getElementById("csc_Waiver").value;
      vs_w = document.getElementById("vs_Waiver").value;
      vat_w = document.getElementById("vat_Waiver").value;
      if(id_w != ""){
            const IDWRate = baseIDRate * (100-id_w)/100 //console.log("id waiver is : " + id_w);
            document.getElementById("iduty_Rate").value = IDWRate.toFixed(2) +"%";

            }else {
            document.getElementById("iduty_Rate").value = baseIDRate +"%";

            } 

            if(et_w != ""){
            const ETWRate = baseETRate * (100-et_w)/100 //console.log("id waiver is : " + id_w);
            document.getElementById("etax_Rate").value = ETWRate.toFixed(2) +"%";
            }else{
            document.getElementById("etax_Rate").value = baseETRate +"%";

            }

            if(csc_w != ""){
            const CSCWRate = baseCSCRate * (100-et_w)/100 //console.log("id waiver is : " + id_w);
            document.getElementById("csc_Rate").value = CSCWRate.toFixed(2) +"%";
            }else {
            document.getElementById("csc_Rate").value = baseCSCRate + "%";

            }

      if(hs.value === "8701"){
            document.getElementById("vs_Amount").value = 0;
      }else{
            if(vs_w != ""){
                  const VSWAmount = baseSurcharge * (100-vs_w)/100 //console.log("id waiver is : " + id_w);
                  document.getElementById("vs_Amount").value = VSWAmount.toFixed(2);

            }else {
                  document.getElementById("vs_Amount").value = baseSurcharge.toFixed(2); 

            }
      }

            if(vat_w != ""){
            const VATWRate = baseVATRate * (100-vat_w)/100 //console.log("id waiver is : " + id_w);
            document.getElementById("vat_Rate").value = VATWRate.toFixed(2) +"%";
            }else {
            document.getElementById("vat_Rate").value = baseVATRate + "%";

            }
      }

     

     function check_waiver(){
            let checkWaiver =  document.getElementById("waiver");
            let inputs =  document.getElementsByClassName("tax_Waiver");
            if(checkWaiver.checked == true){
                  for(let i = 0; i <inputs.length; i++){
                        inputs[i].disabled = false;
                  }
            }else{
                  for(let i = 0; i <inputs.length; i++){
                        inputs[i].disabled = true;
                        inputs[i].value = "";

                  }
            }     
      }
