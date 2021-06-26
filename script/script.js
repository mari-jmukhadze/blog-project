
fetch('http://localhost:3000/api/blogs').then(res => res.json()).then(data => {
    console.log(data)
    data['data'].forEach(blog => {
        const row = document.createElement('div');
        row.className = 'row stylediv'
        const divuser = document.createElement('div')
        divuser.className = 'col-lg-12 mt-3'
        const divblog = document.createElement('div')
        divblog.className = 'col-lg-12'
        const puser = document.createElement('p')
        puser.className = 'text-center justify-content-center mystyle'
        const pblog = document.createElement('p')
        pblog.className = 'text-center mystyle blogstyle'
        console.log(blog)

        puser.innerHTML = `<span>${blog.Username}</span>`
        console.log(puser)
        pblog.innerHTML = `<span>${blog.Blog}</span>`
        divuser.appendChild(puser)
        divblog.appendChild(pblog)
        row.appendChild(divuser)
        row.appendChild(divblog)
        const container = document.getElementById('blogs')
        container.appendChild(row)
    })
    
})
