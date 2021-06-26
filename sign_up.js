const btn = document.getElementById('signup')

btn.addEventListener('click', ev => {
    const inputs = document.querySelectorAll('input')
    // console.log(inputs)

    const URL = 'http://localhost:3000/api/users'
    const data = {}
    inputs.forEach(input => {
        data[input.id] = input.value
    })
    const gender = document.getElementById('gender')
    data[gender.id] = gender.value
    fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(data),
          
    })
})
