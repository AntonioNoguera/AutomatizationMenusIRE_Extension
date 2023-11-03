console.log("Testings")

function testingApi(){
    const apiUrl = 'http://localhost:8000/Automatization';

    fetch(apiUrl)
        .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Error al obtener los datos de la API');
        }
        })
        .then(data => {
            //Funcionando
            console.log(data)


            console.log(data.dish_Distribution.length);
            //Dish Distribution 
            const contenedor = document.getElementById('typesTagBar');
            for(i=0;i<data.dish_Distribution.length;i++){
                console.log(data.dish_Distribution[i]);
                var tagIte = data.dish_Distribution[i];

                const nuevoTag = document.createElement('div');
                nuevoTag.className = 'col';

                const tag = document.createElement('span');
                tag.className = "color-cuadro";

                //Aqui veremos como le hago pa tener un conjunto de colores
                tag.style.backgroundColor = 'red';  

                nuevoTag.appendChild(tag);

                const tagText = tagIte.members +"% "+tagIte.name; 

                nuevoTag.appendChild(document.createTextNode(tagText));

                contenedor.appendChild(nuevoTag);
            }

            //Temperature Distribution
            const tempFrioValue = data.temperature_Distribution.find(item => item.name == "Frío").members;
            const tempCaliValue = data.temperature_Distribution.find(item => item.name === "Caliente").members;
            const temIrrelValue = data.temperature_Distribution.find(item => item.name === "Irrelevante").members;
 
            document.getElementById("progBarTempFri").style.width=tempFrioValue+"%";
            document.getElementById("progBarTempIrr").style.width=temIrrelValue+"%";
            document.getElementById("progBarTempCal").style.width=tempCaliValue+"%";

            document.getElementById("tagFri").innerHTML=tempFrioValue;
            document.getElementById("tagIrr").innerHTML=temIrrelValue;
            document.getElementById("tagCal").innerHTML=tempCaliValue;
            //Assamble distribution 
            const assamFalseValue = data.assamble_Distribution.find(item => item.id === 0).members;
            const assamTrueValue = data.assamble_Distribution.find(item => item.id === 1).members;
            
            document.getElementById("progBarAssTrue").style.width=assamTrueValue+"%";
            document.getElementById("progBarAssFalse").style.width=assamFalseValue+"%";

            document.getElementById("tagAssamTrue").innerHTML=assamTrueValue;
            document.getElementById("tagAssamFalse").innerHTML=assamFalseValue;
        })
        .catch(error => {
            console.error(error);
        });

}
testingApi();
/* 
estructura del objeto de return
Prediccion DE tiempo 1:20 primer metodo
{
    objeto{
        [nombre,atributo]
    } 
}

*/