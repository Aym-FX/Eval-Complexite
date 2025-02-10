const { Benchmark } = require("./Outil.js");

const benchmark = new Benchmark(6);

// --------------------------------- \\
// ---------- Find Artist ---------- \\
// --------------------------------- \\

class Artist {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

function findArtistIndexDummy(artists, name) {
    for (let i = 0; i < artists.length; i++) {
        if (artists[i].name === name) {
        return artists[i].id;
        }
    }
    return -1;
}
function findArtistIndexSmart(artists, name) {
    let left = 0;
    let right = artists.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midName = artists[mid].name;
        if (midName === name) {
            return artists[mid].id;
        } else if (midName < name) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

function generateArtists(num) {
    const artists = [];
    for (let i = 0; i < num; i++) {
        const id = (i + 1).toString();
        const name = `Artist ${i + 1}`;
        artists.push(new Artist(id, name));
    }
    return artists;
}

const artists = generateArtists(1000000);

// benchmark.addTest(findArtistIndexDummy, [artists, "Artist 999999"]);
// console.log(findArtistIndexDummy(artists, "Artist 999999"));
// benchmark.addTest(findArtistIndexSmart, [artists, "Artist 999999"]);
// console.log(findArtistIndexSmart(artists, "Artist 999999"))

// ----------------------------------- \\
// ---------- Assign Stages ---------- \\
// ----------------------------------- \\

class Artist2 {
    constructor(id, name, genre, stage) {
        this.id = id;
        this.name = name;
        this.genre = genre;
        this.stage = stage;
    }
}
class Stage {
    constructor(id, name, genres) {
        this.id = id;
        this.name = name;
        this.genres = genres;
    }
}
  
function assignStagesDummy(artists, stages) {
    for (let stage of stages) {
        for (let artist of artists) {
        if (stage.genres.includes(artist.genre)) {
            artist.stage = stage.id;
            break;
        }
        }
    }
}
function assignStagesSmart(artists, stages) {
    for (let stage of stages) {
        for (let artist of artists) {
        if (stage.genres.includes(artist.genre)) {
            artist.stage = stage.id;
            break;
        }
        }
    }
}

function generateArtists2(num) {
    const genres = ["Rock", "Pop", "Jazz", "Classical", "Hip-Hop"];
    const artists2 = [];
    for (let i = 0; i < num; i++) {
        const id = (i + 1).toString();
        const name = `Artist ${i + 1}`;
        const genre = genres[i % genres.length];
        artists2.push(new Artist2(id, name, genre));
    }
    return artists2;
}
function generateStages(num) {
    const genres = ["Rock", "Pop", "Jazz", "Classical", "Hip-Hop"];
    const stages = [];
    for (let i = 0; i < num; i++) {
        const id = (i + 1).toString();
        const name = `Stage ${i + 1}`;
        const stageGenres = [genres[i % genres.length]];
        stages.push(new Stage(id, name, stageGenres));
    }
    return stages;
}

const artists2 = generateArtists2(100000);
const stages = generateStages(5);

// benchmark.addTest(assignStagesDummy, [artists2, stages]);
// console.log(assignStagesDummy(artists2, stages));
// benchmark.addTest(assignStagesSmart, [artists2, stages]);
// console.log(assignStagesSmart(artists2, stages))

benchmark.run(); 