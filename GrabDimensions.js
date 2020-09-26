
document.querySelector('.submit').addEventListener('click', grabVariables)


function grabVariables(e){

    noOfVariables = document.querySelector('#noOfVariables').value
    noOfEquations = document.querySelector('#noOfEquations').value

    sessionStorage.setItem("noOfVariables", noOfVariables)
    sessionStorage.setItem("noOfEquations", noOfEquations)

    e.preventDefault()

    setTimeout(function(){
        let url = './simplex_dimensions.html'  
        window.location = url
    }, 20)
}





