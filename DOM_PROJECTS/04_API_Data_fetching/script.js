let publicUrl = 'https://jsonplaceholder.typicode.com/todos';

let seachBtn = document.querySelector('button');
let container = document.querySelector('#data-container');

document.addEventListener('DOMContentLoaded', () => {
    seachBtn.addEventListener('click', async () => {
        let dataList = await callAPI()

        if (!dataList || dataList.length <= 0) {
            let h1 = document.createElement('h1');
            h1.textContent = 'Failed to fetch data';
            container.append(h1)
        }


        for (const element of dataList) {
            let div = document.createElement('div')
            div.innerHTML = `
                <h3>UserId : ${element.id}</h3>
                <p>Title : ${element.title}</p>
                <p>completed ${element.title == true ? 'Done' : 'Remaining'}</p>
            `
            container.appendChild(div)
        }

    })
});



async function callAPI() {
    try {
        let rawData = await fetch(publicUrl)
        let usableData = await rawData.json()
        console.log(usableData)
        return usableData.slice(0, 50)
    } catch (error) {
        return []
    }
}
