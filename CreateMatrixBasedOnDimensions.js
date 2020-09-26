const options = {
    greaterThanOrEqualTo: function() {
        let option = document.createElement("option")
        option.text = ">="
        option.value = ">="
        return option
    },
    lessThanOrEqualTo: function() {
        let option = document.createElement("option")
        option.text = "<="
        option.value = "<="
        return option
    },
    equalTo: function() {
        let option = document.createElement("option")
        option.text = "="
        option.value = "="
        return option
    }
}


function createMatrix(noOfVariables, noOfEquations){
   
    let matrix = document.createElement("section")
    matrix.id = "matrix"
    
    for(let i = 1; i <= noOfEquations; i++){

        let div = document.createElement("div")
        div.className = "row"

        for(let i = 1; i <= noOfVariables; i++){
            let input = document.createElement("input")
            
            if (i != noOfVariables){
                var para = document.createTextNode(`x${i} +`)
            }
            else{
                var para = document.createTextNode(`x${i}`)
            }

            input.className = "matrix_inputs"
            div.appendChild(input)
            div.appendChild(para)
        }
        // Put in the right side of inequalities
        let select = document.createElement("select")
        select.style = "margin: 0px 20px 0px 20px;"
        select.append(options.lessThanOrEqualTo())
        select.append(options.equalTo())
        select.append(options.greaterThanOrEqualTo())
        
        div.appendChild(select)

        let rightMostInput = document.createElement("input")
        rightMostInput.className = "matrix_inputs"

        div.appendChild(rightMostInput)

        matrix.appendChild(div)
    }
    
    const submit = document.querySelector(".submit")
    document.body.insertBefore(matrix, submit)
}

function includeMaximizingFunction(noOfVariables){
    let maximizingFunction = document.createElement("section")

    maximizingFunction.id = "maximizingFunction"

    let div = document.createElement("div")

    div.className = "row"

    div.appendChild(document.createTextNode("z = "))

    for(let i = 1; i <= noOfVariables; i++){
        let input = document.createElement("input")

        
        if (i != noOfVariables){
            var para = document.createTextNode(`x${i} +`)
        }
        else{
            var para = document.createTextNode(`x${i}`)
        }

        input.className = "matrix_inputs"
        div.appendChild(input)
        div.appendChild(para)
    }

    maximizingFunction.appendChild(div)

    const submit = document.querySelector(".submit")
    document.body.insertBefore(maximizingFunction, submit)

}



try{
    var noOfVariables = parseInt(sessionStorage.getItem("noOfVariables"))
    var noOfEquations = parseInt(sessionStorage.getItem("noOfEquations"))
}
catch{
    console.log("Invalid entry for number of Variables ")
}


createMatrix(noOfVariables, noOfEquations)
includeMaximizingFunction(noOfVariables)


async function GetFromBackend(matrix){
    const response = await fetch(`http://127.0.0.1:5000/calculateSimplex/${matrix}`)
    const data = await response.json()

    return data
}



document.body.querySelector(".submit").addEventListener("click", () => {
    let coeffNodes = document.querySelectorAll(".matrix_inputs")

    print(coeffNodes)
  
    matrix = []
    let counter = 0
    let row = []
    noOfRowInputs = noOfVariables + 1
   
    coeffNodes.forEach((coeffNode) =>{
             
        row.push(parseInt(coeffNode.value))
        counter++

        if(counter === noOfRowInputs){
            matrix.push(row)
            row = []
            counter = 0

        }
    })



    // The last row will need an extra value pushed - this value represents the z value (optimal value)
    row.push(0)
    matrix.push(row)
    
    matrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

    console.log(matrix)



// Stringifying data converts it to JSON format which the python scripts can parse
    

   GetFromBackend(JSON.stringify(matrix))
   .then((data) =>{
        appendSolution(data)
   })
   .catch(error => console.log(error))


})

function appendSolution(data){
    console.log(data)  
    let solution = document.createElement("div")
    solution.innerHTML = `
    <h3 style="font-size: 35px;"> Solution <h3>
    <p style="font-size: 25px;"> Optimal Value: ${data['optimalvalue']} <p>
    
    `
    document.body.appendChild(solution)


}

