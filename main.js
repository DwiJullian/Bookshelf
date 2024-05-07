
function tambahBuku() {

    let tampung = JSON.parse(localStorage.getItem("Buku")) || { belumSelesai: [] , selesai: [] }

    const Judul = document.getElementById("inputBookTitle").value;
    const Penulis = document.getElementById("inputBookAuthor").value;
    const Tahun = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    const Buku = {
        id: new Date().getTime(),
        Judul : Judul,
        Penulis : Penulis,
        Tahun : Tahun,
        isComplete : isComplete
    };

    Buku.isComplete ? tampung.selesai.push(Buku) : tampung.belumSelesai.push(Buku);

    localStorage.setItem("Buku", JSON.stringify(tampung));

    tampilkan();

};

function alert() {
    const div = document.createElement("div")
    div.classList.add("alert")
    const button = document.createElement("button")
    button.classList.add("button")
    
    div.textContent = "Berhasil menambahkan buku baru ✅"
    button.textContent = "X"
    document.body.appendChild(div);
    document.body.appendChild(button);
    div.appendChild(button)

    button.addEventListener("click", function() {
        div.remove();
    })
}

function tampilkan() {

    const tangkapBuku = JSON.parse(localStorage.getItem("Buku")) || { belumSelesai: [] , selesai: [] }
    const belumDibaca = document.getElementById("incompleteBookshelfList")
    const selesaiDibaca = document.getElementById("completeBookshelfList")
    belumDibaca.innerHTML = "";
    selesaiDibaca.innerHTML= "";

    tangkapBuku.belumSelesai.forEach(Buku => {

        const article = document.createElement("article");
        belumDibaca.appendChild(article)
        article.classList.add("book_item");

        const h3 = document.createElement("h3")
        article.appendChild(h3);
        h3.textContent = `${Buku.Judul}`

        const p = document.createElement("p")
        article.appendChild(p);
        p.classList.add("p");
        p.textContent =`Penulis: ${Buku.Penulis}`

        const p2 = document.createElement("p")
        article.appendChild(p2);
        p2.classList.add("p2");
        p2.textContent =`Tahun: ${Buku.Tahun}`

        const buttonPindah = document.createElement("button");
        buttonPindah.style.backgroundColor = "green";
        buttonPindah.style.color = "white"
        buttonPindah.style.padding = "5px"
        buttonPindah.style.borderRadius = "5px"
        buttonPindah.style.outline = "none"
        buttonPindah.addEventListener("click", function(){
            Buku.isComplete = !Buku.isComplete
            const perubahan = tangkapBuku.belumSelesai.indexOf(Buku)
            tangkapBuku.belumSelesai.splice(perubahan, 1)
            tangkapBuku.selesai.push(Buku)
            localStorage.setItem("Buku", JSON.stringify(tangkapBuku))
            tampilkan();
        });
        article.appendChild(buttonPindah)
        buttonPindah.classList.add("pindah")
        buttonPindah.textContent = 
            Buku.isComplete ? "Belum Selesai dibaca" : "Selesai dibaca";

        const buttonHapus = document.createElement("button");
        buttonHapus.style.backgroundColor = "red"
        buttonHapus.style.color = "white"
        buttonHapus.style.padding = "5px"
        buttonHapus.style.borderRadius = "5px"
        buttonHapus.style.outline = "none"
        buttonHapus.textContent = "Hapus"
        buttonHapus.addEventListener("click", function(){
            const penghapusan = tangkapBuku.belumSelesai.indexOf(Buku);
            tangkapBuku.belumSelesai.splice(penghapusan, 1)
            localStorage.setItem("Buku", JSON.stringify(tangkapBuku))
            tampilkan();
        })
        article.appendChild(buttonHapus)
    });

    tangkapBuku.selesai.forEach(Buku => {

        const article = document.createElement("article");
        selesaiDibaca.appendChild(article)
        article.classList.add("book_item");

        const h3 = document.createElement("h3")
        article.appendChild(h3);
        h3.textContent = `${Buku.Judul}`

        const p = document.createElement("p")
        article.appendChild(p);
        p.classList.add("p");
        p.textContent =`Penulis: ${Buku.Penulis}`

        const p2 = document.createElement("p")
        article.appendChild(p2);
        p2.classList.add("p2");
        p2.textContent =`Tahun: ${Buku.Tahun}`

        const buttonPindah = document.createElement("button");
        buttonPindah.style.backgroundColor = "green";
        buttonPindah.style.color = "white"
        buttonPindah.style.padding = "5px"
        buttonPindah.style.borderRadius = "5px"
        buttonPindah.style.outline = "none"
        buttonPindah.addEventListener("click", function(){
            Buku.isComplete = !Buku.isComplete
            const perubahan = tangkapBuku.selesai.indexOf(Buku)
            tangkapBuku.selesai.splice(perubahan, 1)
            tangkapBuku.belumSelesai.push(Buku)
            localStorage.setItem("Buku", JSON.stringify(tangkapBuku))
            tampilkan();
        });
        article.appendChild(buttonPindah)
        buttonPindah.classList.add("pindah")
        buttonPindah.textContent = 
            Buku.isComplete ? "Belum Selesai dibaca" : "Selesai dibaca";

        const buttonHapus = document.createElement("button");
        buttonHapus.style.backgroundColor = "red"
        buttonHapus.style.color = "white"
        buttonHapus.style.padding = "5px"
        buttonHapus.style.borderRadius = "5px"
        buttonHapus.style.outline = "none"
        buttonHapus.textContent = "Hapus"
        buttonHapus.addEventListener("click", function(){
            const penghapusan = tangkapBuku.selesai.indexOf(Buku);
            tangkapBuku.selesai.splice(penghapusan, 1)
            localStorage.setItem("Buku", JSON.stringify(tangkapBuku));
            tampilkan();
        })
        article.appendChild(buttonHapus)
    });
}

const tampil = document.getElementById("bookSubmit")
tampil.addEventListener("click", function(e) {
    tambahBuku();
    tampilkan();
    alert();
    e.preventDefault()
})

const html = document.addEventListener("DOMContentLoaded", function (){
    tampilkan();
})

function cariBuku() {


    const yangDicari = document.getElementById("searchBookTitle").value.toLowerCase();
    const hasilCari = document.getElementById("list_search_book");
    const bukuDiambil = JSON.parse(localStorage.getItem("Buku")) || { belumSelesai: [], selesai: [] };
    console.log(bukuDiambil)

    const pencarian = bukuDiambil.belumSelesai.concat(bukuDiambil.selesai).filter(buku => {
        return buku.Judul.toLowerCase().includes(yangDicari);
    });

    pencarian.forEach(buku => {
        const h3 = document.createElement("h3");
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");

        hasilCari.appendChild(h3)
        hasilCari.appendChild(p1)
        hasilCari.appendChild(p2)

        h3.textContent = `${buku.Judul}`;
        p1.textContent = `Penulis : ${buku.Penulis}`;
        p2.textContent = `Tahun : ${buku.Tahun}`;

    })

}

const tampilCari = document.getElementById("searchSubmit");
    tampilCari.addEventListener("click", function(e) {
    cariBuku();
    e.preventDefault()
})













