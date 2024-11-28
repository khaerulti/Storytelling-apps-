let attempts = 5;

const storyData = {
    start: {
        text: "Kamu terbangun di sebuah ruangan gelap. Ada teka-teki di atas meja: 'Jika 3x + 7 = 22, berapa nilai x?'",
        inputRequired: true,
        correctAnswer: "5",
        correctScene: "correctStart",
        wrongScene: "start"
    },
    correctStart: {
        text: "Pintu rahasia terbuka di dinding. Di depan lorong, ada teka-teki lain: 'Jika jumlah tiga angka berturut-turut adalah 21, berapa angka tengahnya?'",
        inputRequired: true,
        correctAnswer: "7",
        correctScene: "hallway",
        wrongScene: "correctStart"
    },
    hallway: {
        text: "Di lorong berikutnya, kamu melihat sebuah papan dengan pertanyaan: 'Jika akar kuadrat dari suatu angka adalah 9, berapa angka aslinya?'",
        inputRequired: true,
        correctAnswer: "81",
        correctScene: "sandiPintu",
        wrongScene: "hallway"
    },
    sandiPintu: {
        text: "Di lorong berikutnya, kamu melihat sebuah pintu yang memasukan konci sandi yang bertulis bahasa korea: 'buka pintu ?'",
        inputRequired: true,
        correctAnswer: "문을 열다",
        correctScene: "lembaran",
        wrongScene: "sandiPintu"
    },
    lembaran: {
        text: "Di dalam ruangan, ada lembaran bahasa korea: 'buka peti itu ?'",
        inputRequired: true,
        correctAnswer: "저 가슴을 열려세요",
        correctScene: "safeRoom",
        wrongScene: "lembaran"
    },
    safeRoom: {
        text: "Di tengah ruangan, ada peti besi terkunci dengan teka-teki: 'Jika 4x - 3 = 17, berapa nilai x ?'",
        inputRequired: true,
        correctAnswer: "5",
        correctScene: "treasure",
        wrongScene: "safeRoom"
    },
    treasure: {
        text: "Kamu membuka peti dan menemukan rahasia bahasa korea : 'megic'",
        inputRequired: true,
        correctAnswer: "마법",
        correctScene: "artifactRoom",
        wrongScene: "treasure"
    },
    
    artifactRoom: {
        text: "Kamu memasuki ruangan dan menemukan sebuah artefak yang bertulis :'평화빛'",
        inputRequired: true,
        correctAnswer: "cahaya kedamaian",
        correctScene: "cahaya",
        wrongScene: "artifactRoom"
    },
    cahaya: {
        text: "kemudian artepak itu bercahaya dan mengelurakan Teka-teki berikutnya berbunyi: 'Jika kamu membagi 80 koin dalam rasio 5:3, berapa koin di bagian terbesar?'",
        inputRequired: true,
        correctAnswer: "50",
        correctScene: "power",
        wrongScene: "cahaya"
    },
    power: {
        text: "Artefak memberikan kekuatan besar padamu. Sebuah teka-teki terakhir muncul: 'Jika 7x - 14 = 42, berapa nilai x ?'",
        inputRequired: true,
        correctAnswer: "8",
        correctScene: "finalChallenge",
        wrongScene: "power"
    },
    finalChallenge: {
        text: "Kamu memasuki ruangan terakhir dan melihat sebuah teka-teki yang lebih sulit: 'Jika 8x + 5 = 45, berapa nilai x ?'",
        inputRequired: true,
        correctAnswer: "5",
        correctScene: "ending",
        wrongScene: "finalChallenge"
    },
    ending: {
        text: "Kamu berhasil memecahkan semua teka-teki! Dunia sekarang di tanganmu.",
        choices: [
            { text: "Gunakan kekuatan untuk kebaikan", nextScene: "hero" },
            { text: "Gunakan kekuatan untuk kejahatan", nextScene: "evil" }
        ]
    },
    hero: {
        text: "Kamu menggunakan kekuatan untuk kebaikan. Dunia menjadi tempat yang lebih baik.",
        choices: []
    },
    evil: {
        text: "Kamu menggunakan kekuatan untuk egoismu. Dunia jatuh dalam kekacauan.",
        choices: []
    }
};

function displayScene(scene) {
    const storyText = document.getElementById("story-text");
    const choicesContainer = document.getElementById("choices");
    const inputContainer = document.getElementById("input-container");

    const currentScene = storyData[scene];
    storyText.classList.remove("fade-in");
    storyText.offsetWidth; // Memicu reflow untuk restart animasi
    storyText.classList.add("fade-in");

    storyText.innerHTML = currentScene.text;
    choicesContainer.innerHTML = '';
    inputContainer.innerHTML = '';

    if (currentScene.inputRequired) {
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.placeholder = "Masukkan jawaban Anda";
        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";

        submitButton.onclick = () => {
            const userAnswer = inputField.value.trim();
            if (userAnswer === currentScene.correctAnswer) {
                alert("Jawaban benar! Kamu berhasil melanjutkan ke tahap berikutnya.");
                displayScene(currentScene.correctScene);
            } else {
                attempts--;
                if (attempts > 0) {
                    alert(`Jawaban salah! Sisa kesempatan: ${attempts}`);
                    displayScene(currentScene.wrongScene);
                } else {
                    alert("Kesempatan habis. Mulai ulang dari awal!");
                    attempts = 5;
                    displayScene("start");
                }
            }
        };

        inputContainer.appendChild(inputField);
        inputContainer.appendChild(submitButton);
    } else if (currentScene.choices) {
        currentScene.choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice.text;
            button.onclick = () => displayScene(choice.nextScene);
            choicesContainer.appendChild(button);
        });
    }
}

displayScene("start");
