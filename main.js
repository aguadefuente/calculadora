console.log("Hello World");

const pantalla = document.querySelector(".screen");

////NUMBERS BUTTONS - ACTUAL NUMBER
const numbers = document.querySelectorAll(".numero");
//console.log(numbers);
const decimal = document.querySelector(".decimal");
//console.log("decimal", decimal.value);

let actualnum = "";

numbers.forEach((elem) => {
  elem.addEventListener("click", function () {
    actualnum += elem.value;

    console.log("actual", actualnum);
    console.log(elem.value);
    resultado.textContent = actualnum;
    maxreach();
    //para desabilitar el decimal si ya se usó
    console.log("prueba", actualnum.includes("."));
    if (actualnum.includes(".")) {
      decimal.disabled = true;
    }
  });
});

//OPERATOR BUTTONS - LASTNUMBER
const operator = document.querySelectorAll(".operator");
//console.log(operator)
let lastnum = "";
let sign = "";

operator.forEach((elem) => {
  elem.addEventListener("click", function () {
    //IF PARA NEGATIVE NUMBERS
    if (actualnum === "" && elem.value === "-") {
      actualnum = "-";
      resultado.textContent = actualnum;
      equal.disabled = false;
    } else {
      lastnum = actualnum;
      actualnum = "";

      //para poder volver a usar el decimal
      decimal.disabled = false;

      sign = elem.value;
      console.log("lastnum", lastnum);
      console.log("actualnum", actualnum);
      console.log("sign", sign);
      console.log(elem.value);
      resultado.textContent = sign;
      equal.disabled = false;
    }
  });
});

//IQUAL BUTTON - RESULT
let result = "";
const equal = document.querySelector(".igual");
//console.log(equal);

const calc = document.querySelector(".calc");
calc.style.color = "silver";
const resultado = document.querySelector(".resultado");

equal.addEventListener("click", function () {
  if (
    resultado.textContent.length === 0 ||
    lastnum === "" ||
    actualnum === ""
  ) {
    equal.disabled = true;
  } else {
    switch (sign) {
      case "+":
        //para solucionar que JavaScript no suma bien 0.1 + 0.2
        if (
          (Number.parseFloat(actualnum) === 0.1 ||
            Number.parseFloat(actualnum) === 0.2) &&
          (Number.parseFloat(lastnum) === 0.1 ||
            Number.parseFloat(lastnum) === 0.2)
        ) {
          let x = (0.2 * 10 + 0.1 * 10) / 10;
          result = x;
        } else {
          result = Number.parseFloat(lastnum) + Number.parseFloat(actualnum);
        }

        break;
      case "x":
        result = Number.parseFloat(lastnum) * Number.parseFloat(actualnum);
        break;

      case "/":
        result = (
          Number.parseFloat(lastnum) / Number.parseFloat(actualnum)
        ).toFixed(10);
        break;

      case "-":
        result = Number.parseFloat(lastnum) - Number.parseFloat(actualnum);
        break;

      default:
        throw new Error(
          "operador no soportado",
          (resultado.textContent = "ERR")
        );
        break;
    }

    console.log(
      Number.parseFloat(lastnum) + sign + Number.parseFloat(actualnum)
    );
    calc.textContent =
      Number.parseFloat(lastnum) + sign + Number.parseFloat(actualnum);

    actualnum = result;
    equal.disabled = true;

    decimal.disabled = false;
    resultado.textContent = result;
    maxreach();
    console.log(result);
  }
});

//CLEAR-ALL BUTTON
const clear = document.querySelector(".reset");

clear.addEventListener("click", function () {
  lastnum = "";
  actualnum = "";
  sign = "";
  result = "";
  calc.textContent = "";
  resultado.textContent = "";

  decimal.disabled = false;
  equal.disabled = false;
});

//DELETE
const borrar = document.querySelector(".borrar");

borrar.addEventListener("click", function () {
  actualnum = actualnum.slice(0, -1);
  console.log(actualnum);
  resultado.textContent = actualnum;
});

//SI INTRODUCIMOS MUCHAS CIFRAS
const message = document.querySelector("p");
message.visibility = "hidden";

function maxreach() {
  resultado.style.color = "black";
  if (resultado.textContent.length > 15) {
    resultado.textContent = "Err";
    resultado.style.color = "orangered";
    calc.textContent = "";
  }
}
