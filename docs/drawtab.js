function draw(name, major, k, sn, tune, note, chord) {
    function calcPos(f) {
        return f * (55 - f / 1.7);
    }
    function calcCenter(f) {
        return (calcPos(f) + calcPos(f - 1)) / 2;
    }
    const LEFT = 20;
    const TOP = 40;
    const noteName = [
        ["T", "2♭", "2", "3♭", "3", "4", "4♯", "5", "6♭", "6", "7♭", "7"],
        ["T", "2♭", "2", "3♭", "3", "4", "5♭", "5", "6♭", "6", "7♭", "7"]
    ];
    const canvas = document.getElementById("canv");
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (let i = 0; i < sn; i++) {
        ctx.moveTo(LEFT, TOP + i * 20);
        ctx.lineTo(LEFT + calcPos(24), TOP + i * 20);
    }
    for (let i = 0; i <= 24; i++) {
        ctx.moveTo(LEFT + calcPos(i), TOP + 0 * 20);
        ctx.lineTo(LEFT + calcPos(i), TOP + (sn - 1) * 20);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "15pt Arial";
    ctx.fillText(name, LEFT, 15);
    const marks = [3, 5, 7, 9, 12, 15, 17, 19, 21];
    ctx.font = "13pt Arial";
    for (let p of marks) {
        ctx.fillText(p.toString(), calcCenter(p) + LEFT - 5, TOP + (sn - 1) * 20 + 30);
    }
    const offset = 4 + 24 - k;
    for (let i = 0; i < sn; i++) {
        const str = i + (sn < 6 ? 1 : 0);
        for (let pos = 1; pos <= 24; pos++) {
            const noteNum = (tune[str] + pos + offset) % 12;
            const flag = major[noteNum];
            if (flag == 0)
                continue;
            if (note) {
                ctx.fillText(noteName[chord ? 1 : 0][noteNum], calcCenter(pos) + LEFT - 3, TOP + 5 + i * 20);
            }
            else {
                ctx.beginPath();
                ctx.arc(calcCenter(pos) + LEFT, TOP + i * 20, 7, 0, Math.PI * 2, true);
                switch (flag) {
                    case 1:
                        ctx.fillStyle = "black";
                        ctx.fill();
                        break;
                    case 2:
                        ctx.fillStyle = "white";
                        ctx.fill();
                        ctx.stroke();
                        break;
                    case 3:
                        ctx.fillStyle = "blue";
                        ctx.fill();
                        break;
                }
            }
        }
    }
}
const keys = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"];
const key = document.getElementById("key");
for (const [idx, val] of keys.entries()) {
    const opt = document.createElement("option");
    opt.value = idx.toString();
    opt.text = val;
    key.appendChild(opt);
}
const scales = [
    ["Major", [2, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1], true, true],
    ["Minor", [2, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0], true, true],
    ["Major Penta", [2, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0], true, true],
    ["Minor Penta", [2, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0], true, true],
    ["Major Blues", [2, 0, 1, 3, 1, 0, 0, 1, 0, 1, 0, 0], true, false],
    ["Minor Blues", [2, 0, 0, 1, 0, 1, 3, 1, 0, 0, 1, 0], true, false],
    ["Harmonic Minor", [2, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1], true, true],
    ["Melodic Minor", [2, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1], true, false],
    ["Dorian", [2, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0], true, true],
    ["Phrygian", [2, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0], true, false],
    ["Lydian", [2, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1], true, true],
    ["Lydian 7th", [2, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0], true, false],
    ["Mixolydian", [2, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0], true, true],
    ["Locrian", [2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0], true, false],
    ["Diminish Scale", [2, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1], true, false],
    ["Con-Diminish", [2, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0], true, false],
    ["Altered", [2, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0], true, false],
    ["Whole tone", [2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], true, false],
    ["Major Triad", [2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0], false, true],
    ["Minor Triad", [2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0], false, true],
    ["Major 7th", [2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1], false, true],
    ["Dominant 7th", [2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], false, true],
    ["Minor 7th", [2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0], false, true],
    ["Minor 7th♭5", [2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0], false, true],
    ["Minor M7th", [2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], false, true],
    ["Diminish", [2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0], false, false],
    ["Augument", [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], false, false],
    ["Augument 7th", [2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0], false, false],
];
const next = document.getElementById("next");
const contain = document.getElementById("contain");
const scaleHeader = document.getElementById("scale-next");
const chordHeader = document.getElementById("chord-contained");
function findNext(key, scale) {
    next.innerHTML = "";
    contain.innerHTML = "";
    const scaleNote = scales[scale][1];
    if (scales[scale][2]) {
        scaleHeader.textContent = "Scale next to";
        chordHeader.textContent = "Chord contained";
        OUTER: for (const [idx, [name, nextScale, isScale]] of scales.entries()) {
            if (!isScale || idx == scale)
                continue;
            let count = 0;
            for (const [j, n] of scaleNote.entries()) {
                if ((n !== 0) != (nextScale[j] !== 0)) {
                    count++;
                    if (count > 2) {
                        continue OUTER;
                    }
                }
            }
            const row = document.createElement("div");
            row.innerHTML = key + " " + name;
            next.appendChild(row);
        }
        OUTER: for (const [idx, [name, nextScale, isScale]] of scales.entries()) {
            if (isScale || idx == scale)
                continue;
            for (const [j, n] of scaleNote.entries()) {
                if (n === 0 && nextScale[j] !== 0) {
                    continue OUTER;
                }
            }
            const row = document.createElement("div");
            row.innerHTML = key + " " + name;
            contain.appendChild(row);
        }
    }
    else {
        scaleHeader.textContent = "Scale contains";
        chordHeader.textContent = "";
        OUTER: for (const [idx, [name, nextScale, isScale]] of scales.entries()) {
            if (!isScale)
                continue;
            for (const [j, n] of scaleNote.entries()) {
                if (n !== 0 && nextScale[j] === 0) {
                    continue OUTER;
                }
            }
            const row = document.createElement("div");
            row.innerHTML = key + " " + name;
            next.appendChild(row);
        }
    }
}
const scale = document.getElementById("scale");
function scaleSelection(mode, adv) {
    scale.innerHTML = "";
    for (const [idx, [val, , sc, ad]] of scales.entries()) {
        if (mode != 2) {
            if (mode == 0 !== sc)
                continue;
        }
        if (!adv && !ad)
            continue;
        const opt = document.createElement("option");
        opt.value = idx.toString();
        opt.text = val;
        scale.appendChild(opt);
    }
}
const strings = document.getElementById("strings");
for (let i = 4; i <= 8; i++) {
    const opt = document.createElement("option");
    opt.value = i.toString();
    opt.text = i + " strings";
    strings.appendChild(opt);
}
strings.selectedIndex = 2;
const tunes = [
    ["Regular", [24, 19, 15, 10, 5, 0, -5, -10]],
    ["Drop D", [24, 19, 15, 10, 5, -2, -7, -12]],
    ["DADGAD", [22, 17, 15, 10, 5, -2, -7, -9]],
    ["Bass", [20, 15, 10, 5, 0, -5, -10, -15]]
];
const tune = document.getElementById("tune");
for (const [idx, [val]] of tunes.entries()) {
    const opt = document.createElement("option");
    opt.value = idx.toString();
    opt.text = val;
    tune.appendChild(opt);
}
const note = document.getElementById("note");
function repaint() {
    const k = parseInt(key.value);
    const s = parseInt(scale.value);
    const sn = parseInt(strings.value);
    const t = parseInt(tune.value);
    const n = note.checked;
    findNext(keys[k], s);
    draw(keys[k] + " " + scales[s][0], scales[s][1], k, sn, tunes[t][1], n, !scales[s][2]);
}
key.onchange = repaint;
scale.onchange = repaint;
strings.onchange = repaint;
tune.onchange = repaint;
note.onchange = repaint;
const advanced = document.getElementById("advanced");
const types = [
    document.getElementById("t0"),
    document.getElementById("t1"),
    document.getElementById("t2"),
];
function changeMode() {
    let idx = 0;
    for (; idx < types.length; idx++) {
        if (types[idx].checked)
            break;
    }
    if (idx >= types.length)
        idx = 0;
    scaleSelection(idx, advanced.checked);
    repaint();
}
advanced.onchange = changeMode;
types.forEach(elm => elm.onchange = changeMode);
changeMode();
