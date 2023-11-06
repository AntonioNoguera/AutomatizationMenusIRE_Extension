const paleta = ["#ff6666","	#ffbd55","#ffff66","#9de24f","#87cefa","#A0C4FF","#725fe2","#FFC6FF","#FFFFFC"]
var membersAbove =[]; 

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
            const mainTags = ["Desayuno","Comida","Cena"]
 
            //Dish Distribution 
            const contenedor = document.getElementById('typesTagBar');
            for(i=0;i<data.dish_Distribution.length;i++){ 
                var tagIte = data.dish_Distribution[i];

                if(!mainTags.includes(tagIte.name)){membersAbove.push(tagIte.name)}
                //TAGS
                const nuevoTag = document.createElement('div');
                nuevoTag.className = 'col';

                const tag = document.createElement('span');
                tag.className = "color-cuadro"; 
                tag.style.backgroundColor = paleta[i];  

                nuevoTag.appendChild(tag);

                const tagText = tagIte.members +"% "+tagIte.name; 

                nuevoTag.appendChild(document.createTextNode(tagText));

                contenedor.appendChild(nuevoTag);

                //BARS
                //Father
                const navBar = document.getElementById("dishTypeBar");

                const newBarH = document.createElement('div');
                newBarH.className = 'progress';
                newBarH.style.width = tagIte.members+"%";  
                

                //Son
                const newBarM = document.createElement('div');
                newBarM.className = "progress-bar progress-bar-striped progress-bar-animated";
                newBarM.style.backgroundColor = paleta[i]; 

                newBarH.appendChild(newBarM);
                navBar.appendChild(newBarH);
            }
            console.log(membersAbove);

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

function clearAll(){
    var dias = document.getElementById("dServicio").value="";
    var turnos = document.getElementById("tDia").value="";
    var distribucion = document.getElementById("dPlatillo").value="";
    var temp = document.getElementsByName("temp")[0].checked=true;
}

function calligAPI(){
    var dias = document.getElementById("dServicio").value.split(/\s*,\s*/);
    var turnos = document.getElementById("tDia").value.split(/\s*,\s*/);
    var distribucion = document.getElementById("dPlatillo").value.split(/\s*,\s*/);
    var temp = document.getElementsByName("temp")[0].checked;

    var objectMembers=[];
    for(i=0;i<membersAbove.length;i++){
        var jsonObj = {};
        jsonObj["name"] = membersAbove[i];
        jsonObj["recurrence"] = distribucion[i];
        objectMembers.push(jsonObj);
    } 

    var temp = temp? true: false;

    console.log(dias," - ",turnos," - ",distribucion," - ",temp);

    var postJson = {
        nameServiceDays:dias,
        turnsOfDay:turnos,
        turnFormat:objectMembers,
        booleanTemp: temp
    }

    console.log(postJson)
    post(postJson);
}

function post(data){ 
    const url = 'http://localhost:8000/Automatization'; // Reemplaza con la URL de tu API

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Ajusta el tipo de contenido según tus necesidades
        },
        body: JSON.stringify(data) // Convierte el objeto a JSON
    })
        .then(response => response.json()) // Si esperas una respuesta JSON
        .then(data => {
            console.log(data); // Maneja la respuesta aquí
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

testingApi();


/*
var returnFormat={   
    [
        //Arreglo del Turno Semanal
        weekly_turn:[
            day:"Lunes",
            food_time:[
                food:"Desayuno",
                members:[
                    "DISH MODEL",
                    "DISH MODEL",
                ]
            ]
        ]
    ]
};
*/