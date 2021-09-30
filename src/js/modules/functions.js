import {} from './variables.js'

/*
Pour chaque objet photographer, ajouter une élément html correspondant aux attentes de la maquette
Se connecter à une API
Parcourir un fichier json
Récupérer les informations du json
Boucler pour afficher autant de contenu que d'ittération de photographes
*/
export async function getData (url) {
  const response = await fetch(url)

  if (!response.ok) {
    console.log('Retour serveur : ' + response.status)
  } else {
    // console.log(response.status);
    const profilData = await response.json()
    return profilData
  }
};
