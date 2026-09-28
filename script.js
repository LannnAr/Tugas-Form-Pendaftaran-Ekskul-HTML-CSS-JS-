// Array untuk menyimpan data siswa
let dataSiswa = [];

// Menyimpan index data yang sedang diedit
let indexEdit = -1;


// Mengambil elemen HTML
const form = document.getElementById("formPendaftaran");
const namaInput = document.getElementById("nama");
const jurusanInput = document.getElementById("jurusan");
const ekskulInput = document.getElementById("ekskul");
const dataList = document.getElementById("dataList");
const btnTambah = document.getElementById("btnTambah");
const toast = document.getElementById("toast");


function showToast(message, type = "success") {
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(function () {
        toast.className = "toast";
    }, 1800);
}


// ===============================
// TAMBAH DATA / SIMPAN EDIT
// ===============================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Mengambil nama
    const nama = namaInput.value.trim();

    // Mengambil kelas
    const kelasElement = document.querySelector(
        'input[name="kelas"]:checked'
    );

    // Mengecek apakah kelas sudah dipilih
    if (!kelasElement) {
        showToast("Silakan pilih kelas terlebih dahulu!", "warning");
        return;
    }

    const kelas = kelasElement.value;
    const jurusan = jurusanInput.value;
    const ekskul = ekskulInput.value;


    // Jika sedang melakukan edit
    if (indexEdit !== -1) {

        dataSiswa[indexEdit] = {
            nama: nama,
            kelas: kelas,
            jurusan: jurusan,
            ekskul: ekskul
        };

        showToast("Data berhasil diubah!", "success");

        // Kembali ke mode tambah
        indexEdit = -1;
        btnTambah.textContent = "Tambah Data";

    }

    // Jika menambah data baru
    else {

        const dataBaru = {
            nama: nama,
            kelas: kelas,
            jurusan: jurusan,
            ekskul: ekskul
        };

        dataSiswa.push(dataBaru);
        showToast("Data berhasil ditambah!", "success");
    }


    // Menampilkan data
    tampilkanData();

    // Mengosongkan form
    form.reset();

});


// ===============================
// MENAMPILKAN DATA
// ===============================

function tampilkanData() {

    // Kosongkan isi tabel
    dataList.innerHTML = "";


    // Jika data masih kosong
    if (dataSiswa.length === 0) {

        dataList.innerHTML = `
            <tr>
                <td colspan="6" class="kosong">
                    Belum ada data
                </td>
            </tr>
        `;

        return;
    }


    // Menampilkan semua data
    dataSiswa.forEach(function (data, index) {

        const row = document.createElement("tr");
        row.classList.add("row-animate");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.nama}</td>
            <td>${data.kelas}</td>
            <td>${data.jurusan}</td>
            <td>${data.ekskul}</td>

            <td>
                <button
                    class="btn-edit"
                    onclick="editData(${index})">
                    Edit
                </button>

                <button
                    class="btn-delete"
                    onclick="hapusData(${index})">
                    Delete
                </button>
            </td>
        `;

        dataList.appendChild(row);

    });

}


// ===============================
// EDIT DATA
// ===============================

function editData(index) {

    // Mengambil data yang dipilih
    const data = dataSiswa[index];


    // Memasukkan nama ke form
    namaInput.value = data.nama;


    // Memilih kelas
    const radioKelas = document.querySelectorAll(
        'input[name="kelas"]'
    );

    radioKelas.forEach(function (radio) {

        if (radio.value === data.kelas) {
            radio.checked = true;
        }

    });


    // Memilih jurusan
    jurusanInput.value = data.jurusan;


    // Memilih ekskul
    ekskulInput.value = data.ekskul;


    // Menyimpan index data
    indexEdit = index;


    // Mengubah teks tombol
    btnTambah.textContent = "Simpan Edit";

    showToast("Mode edit aktif", "info");

    // Scroll ke bagian atas
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ===============================
// DELETE DATA
// ===============================

function hapusData(index) {

    // Menghapus data
    dataSiswa.splice(index, 1);


    // Menampilkan ulang data
    tampilkanData();
    showToast("Data berhasil dihapus!", "success");

}


// ===============================
// RESET FORM
// ===============================

function resetForm() {

    // Mengosongkan form
    form.reset();


    // Membatalkan mode edit
    indexEdit = -1;


    // Mengubah tombol kembali
    btnTambah.textContent = "Tambah Data";
    showToast("Form berhasil direset", "info");

}