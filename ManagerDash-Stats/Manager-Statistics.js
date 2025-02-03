// Made by F328049 23/12/24
// Updated by F328049 03/02/24



const mgrStatsProj = document.getElementById('mgrProjStats');
const userStatsProj = document.getElementById('mgrUserStats');
mgrStatsProj.addEventListener("click", () => {
    if(mgrStatsProj.style.display == "block") {
        mgrStatsProj.classList.add('mgrStats-active')
        userStatsProj.classList.remove('mgrStats-active')
        document.getElementById("tabGroupProjectStats").style.display = "none";
        document.getElementById("tabGroupUserStats").style.display = "block";

    } else {
        mgrStatsProj.classList.remove('mgrStats-active')
        userStatsProj.classList.add('mgrStats-active')
        document.getElementById("tabGroupUserStats").style.display = "none";
        document.getElementById("tabGroupProjectStats").style.display = "block";

    }
})

userStatsProj.addEventListener("click", () => {
    if(userStatsProj.style.display == "block") {
        mgrStatsProj.classList.remove('mgrStats-active')
        userStatsProj.classList.add('mgrStats-active')
        document.getElementById("tabGroupProjectStats").style.display = "block";
        document.getElementById("tabGroupUserStats").style.display = "none";

    } else {
        mgrStatsProj.classList.add('mgrStats-active')
        userStatsProj.classList.remove('mgrStats-active')
        document.getElementById("tabGroupUserStats").style.display = "block";
        document.getElementById("tabGroupProjectStats").style.display = "none";

    }
})

//
const mgrStatsPostTypeButtons = document.querySelectorAll('.mgrStats-post-type-btns button');
mgrStatsPostTypeButtons.forEach(button => {
    button.addEventListener("click", () => {
        mgrStatsPostTypeButtons.forEach(btn => btn.classList.remove('mgrStats-active'))
        button.classList.add('mgrStats-active')
        filterPosts();
    })
})
   


document.getElementById('fetchDataTest').addEventListener('click', async function() {
    try {
        // Make an HTTP request to the PHP file
        const response = await fetch('ManagerDash-Stats/stats-db.php');
        console.log("1: ", response);
        
        // Ensure the response is OK and return the JSON data 
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convert the response to JSON format
        const data = await response.json();
        console.log("2: ", data[0].projectCount);

        // Find the container to display the data
        const container = document.getElementById('dataContainer');
        container.innerHTML = ''; // Clear any existing content

        // Loop through the data and create a new element for each item
        data.forEach(function(item) {
            const div = document.createElement('div');
            div.textContent = 'Number of projects which have tasks (starting from Project_ID 1): ' + item.projectCount;
            container.appendChild(div); // Add the new element to the container
        });     
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
    }
});
