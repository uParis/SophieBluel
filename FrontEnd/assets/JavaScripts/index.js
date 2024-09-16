const getWorks = () => fetch(`http://localhost:5678/api/works`).then((response) => response.json())
const getCategory = () => fetch(`http://localhost:5678/api/categories`).then((response) => response.json())

async function Init(){
	DisplayCategory(await getCategory())
	DisplayWorks(await getWorks(), 'gallery')

	document.querySelectorAll(".categoryTitle").forEach(category => category.addEventListener("click", event => filterWorksByCategory(event)))
}
async function AllWorks(){
	DisplayWorks(await getWorks(), 'gallery')
}

function DisplayWorks(data, baliseHTML, isModal = false){
	const gallery = document.getElementsByClassName(baliseHTML)[0]
	gallery.innerHTML = ''
	data.forEach((work) => {
		gallery.innerHTML += `
		<figure>
			<img src="${work.imageUrl}" alt="${work.title}">
			${isModal ? `<i class="fa-solid fa-trash-can" onclick="deleteWork(${work.id})"></i>` : `<figcaption>${work.title}</figcaption>`}
		</figure>`
	})
}
function DisplayCategory(data){
	const categoryies = document.querySelector("#category")
	data.forEach((category) => {
		//console.log(category)

		categoryies.innerHTML += `<a data-id='${category.id}' class='categoryBtn categoryTitle'>${category.name} </a>`
	})
}
Init()


async function filterWorksByCategory(event){
	const id = Number(event.target.dataset.id)

	const works = await getWorks()
	DisplayWorks(works.filter(work => work.categoryId === id), 'gallery')
}