// Variables pour la modal suppression de projets
const modalDeleteWork = document.querySelector("#modalsSuppr")
const openGalleryBtn = document.querySelector("#projectEdit")
const closeGalleryBtn = document.querySelector("#fermer-suppr")

// Variables pour la modal ajout de projets
const modalAddWork = document.querySelector("#modalsAjout")
const openAddWork = document.querySelector("#AjoutPhoto")
const previousBtn = document.querySelector(".precedent")
const closeAddWorkBtn = document.querySelector("#fermer-ajout")

// Variables pour upload une image
const uploadImageBtn = document.querySelector("#imageUpload")
const addProject = document.querySelector("#ajout-form")
const uploadProjet = document.querySelector("#previewImage")
const uploadContent = document.querySelector("#previewdetails")
const submitProjet = document.querySelector("#validerAjout")
const backgroundPreview = document.querySelector(".AjoutPhotoContainer")

// Variable pour background modal
const backgroundModal = document.querySelector("#modals")

// Fonction
async function openGallery(){
	modalDeleteWork.style.display = "flex"
	backgroundModal.style.display = "block"
	DisplayWorks(await getWorks(), 'gallerymodal', true)
}
function closeGallery(){
	modalDeleteWork.style.display = "none"
	backgroundModal.style.display = "none"
}
function openWork() {
	modalAddWork.style.display = "flex"
	backgroundModal.style.display = "block"
}
function closeWork() {
	modalAddWork.style.display = "none"
	backgroundModal.style.display = "none"
}


// Ouvrir modals
openGalleryBtn.addEventListener("click", openGallery)
openAddWork.addEventListener("click", function(){
	closeGallery()
	openWork()
})

// Fermer modals
closeGalleryBtn.addEventListener("click", closeGallery)
closeAddWorkBtn.addEventListener("click", closeWork)

previousBtn.addEventListener("click", async function(){
	closeWork()
	openGallery()
	DisplayWorks(await getWorks(), 'gallerymodal', true)
})

// Fermer modals en cliquant en dehors
window.onclick = function (event){
    if (event.target == backgroundModal){
        closeWork()
        closeGallery()
    }
}

























// Supprimer des projets de la boite modale
function deleteWork(id){
    fetch(`http://localhost:5678/api/works/` + id, {
        method: "DELETE",
        headers: {
            'Authorization': getAuthorization()
        },
    })
    .then(() => {
        alert("Projet supprimé")
    }).catch((err) => console.log('Erreur:', err))
}

// Ajouter des projets sur la boite modale
function sendWorkData(data){
	fetch(`http://localhost:5678/api/works`, {
		method: "POST",
		headers: {
			'Authorization': getAuthorization()
		},
		body: data,
	})
}

function submitForm(event){
	event.preventDefault()

	// Récupérer les valeurs du formulaire
	const title = addProject.querySelector("#titreAjout").value
	const category = addProject.querySelector("#selectCategorie").value
	const file = uploadImageBtn.files[0]

	// Créer un objet FormData pour envoyer les données
	const formData = new FormData()
	formData.append('title', title)
	formData.append('category', category)
	formData.append('image', file)

	sendWorkData(formData)
}

// Ajout de l'événement pour gérer l'upload de photos
uploadImageBtn.addEventListener("change", uploadImage)
// Ajout de l'événement pour gérer l'envoi du formulaire
addProject.addEventListener("submit", submitForm)

// Fonction pour afficher l'aperçu de l'image
function uploadImage(){
	if(uploadImageBtn.files && uploadImageBtn.files[0]){
		const reader = new FileReader()
		const image = new Image()

		// Afficher l'image dans la preview
		reader.onload = event => {
            image.src = event.target.result
        }

		// Style de la preview
		uploadContent.style.display = 'none'
        submitProjet.style.backgroundColor = '#1D6154'
        uploadProjet.style.display = 'block'
        backgroundPreview.style.backgroundColor = '#FFFFFF'
		reader.readAsDataURL(uploadImageBtn.files[0])
		uploadProjet.appendChild(image)
	}
}