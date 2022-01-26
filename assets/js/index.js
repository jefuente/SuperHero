$(document).ready(function () {
    $("form").submit(function (e) { 
        e.preventDefault();

        let valueInput = $("#heroeInput").val();


        if (valueInput<=0 || valueInput>732){
            Command: toastr["info"]("Debe ingresar un numero entre 1 y 732", "Valor no válido")

            toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
            }

            let valueInput = $("#heroeInput").val(); 
            
            }

        $.ajax({
            url:"https://www.superheroapi.com/api.php/10159780156942276/"+valueInput,
            success: function(data){
                console.log(data.biography)
                let nombre = data.name
                let imagen = data.image.url
                let conecciones = data.connections['group-affiliation']
                let ocupacion = data.work.occupation
                let primeraAparicion = data.biography['first-appearance']
                let altura = data.appearance.height[1]
                let peso = data.appearance.weight[1]
                let alianzas = data.biography.aliases
                

                $("#heroeInfo").html(
                        `<h3 class= "text-center">SuperHero Encontrado</h3>
                        <div class="card mb-3" >
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img src="${imagen}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body tarjeta">
                                        <h5 class="card-title">Nombre: ${nombre}</h5>
                                        <p class="card-text"><span>Conecciones: </span>${conecciones}</p>

                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item"><p class="card-text"><span>Publicado por: </span>${data.biography['publisher']}</p></li>
                                            <li class="list-group-item"><p class="card-text"><span>Ocupación: </span>${ocupacion}</p></li>
                                            <li class="list-group-item"><p class="card-text"><span>Primera aparición: </span>${primeraAparicion}</p></li>
                                            <li class="list-group-item"><p class="card-text"><span>Altura: </span>${altura}</p></li>
                                            <li class="list-group-item"><p class="card-text"><span>Peso: </span>${peso}</p></li>
                                            <li class="list-group-item"><p class="card-text"><span>Alianzas: </span>${alianzas}</p> </li>
                                        </ul>
                                                                                    
                                    </div>
                                </div>
                            </div>
                        </div>`
                );

                let estadisticas = [];

                var keys = Object.keys(data.powerstats);
                var values = Object.values(data.powerstats);
                console.log(keys);
                console.log(values);

                for (let i = 0; i < keys.length; i++) {              
                    estadisticas.push({
                    label: keys[i],
                    y: parseInt(values[i]),
                    })
                }
                console.log(estadisticas);

                let config ={
                    theme: "light2",
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de Poder para ${nombre}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} ({y})",
                        dataPoints: estadisticas
                    }]               
                }
                let chart = new CanvasJS.Chart("heroeStats", config);
                chart.render()
            }
        })
    });
});