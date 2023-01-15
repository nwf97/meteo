// Sélectionne l'élément bouton et ajoute un écouteur d'événements
const button = document.querySelector('button');

const onClick = () => {
    // Récupère la valeur de l'élément input et la stocke dans la variable "ville"
    const ville = document.querySelector('#citiesList').value;

    // Envoie une requête GET à l'URL spécifiée en utilisant la variable "ville"
    fetch('https://www.prevision-meteo.ch/services/json/' + ville)
        // Convertit la réponse en format JSON
        .then(response => response.json())
        .then((obj) => {
            // Sélectionne l'élément avec l'id "meteo"
            let meteo = document.getElementById('meteo');
            // Vérifie si la ville est valide
            if (obj && obj.city_info) {
                // Afficher météo actuelle
                let tmp = obj.current_condition.tmp;
                let icon_big = obj.current_condition.icon_big;
                let wnd_spd = obj.current_condition.wnd_spd;
                let date = obj.current_condition.date;
                let hour = obj.current_condition.hour;

                // Création d'une 'div' pour le conteneur
                let container = document.createElement("div");
                container.classList.add("container-fluid");

                // Création d'une 'div' pour les colones bootstrap
                let row = document.createElement("div");
                row.classList.add("row");

                // Création d'une div pour les conditions actuelles
                let current_conditions = document.createElement("div");
                current_conditions.classList.add("col-md-3");
                current_conditions.innerHTML = ville + "<br>" + "Temperature : " + tmp + "°C<br>" + "<img src = " + icon_big + ">" + "<br>" + "Vitesse du vent : " + wnd_spd + "km/h <br>" + "Date : " + date + "<br>" + "Heure (dernière actualisation) : " + hour;
                row.appendChild(current_conditions);

                // Ajoutez une boucle pour les 3 jours
                for (let i = 0; i < 3; i++) {
                    // Récupère les données de prévisions pour chaque jour
                    let day = obj["fcst_day_" + i];
                    tmp = day.tmin;
                    icon = day.icon_big;
                    condition = day.condition;

                    // Création d'une div pour les prévisions de chaque jour
                    let forecast = document.createElement("div");
                    forecast.classList.add("col-md-3");
                    forecast.innerHTML = "Temperature : " + tmp + "°C<br>" + "<img src = " + icon + ">" + "<br>" + condition;
                    row.appendChild(forecast);
                }

                // Ajoute la div 'row' à la div parent 'container'
                container.appendChild(row);

                // Ajoute la div 'container' à la div parent 'meteo'
                meteo.appendChild(container);
            }
            else {
                // Affiche un message d'erreur si la ville est invalide
                meteo.innerHTML = "Problème saisie.";
            }

            //Désactivation du boutton
            button.disabled = true;
        })
        // Affiche les erreurs dans la console
        .catch(error => console.log(error));
};

button.addEventListener('click', onClick);


