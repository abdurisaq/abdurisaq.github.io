/* Small, intentionally constrained Vim-motion engine for the portfolio tutorial. */
(function (global) {
    "use strict";

    const clone = (state) => ({
        buffer: [...state.buffer],
        cursor: { line: state.cursor.line, col: state.cursor.col },
        mode: state.mode,
        yank: state.yank,
        pendingKey: state.pendingKey,
    });

    const clampCursor = (state) => {
        if (!state.buffer.length) state.buffer = [""];
        state.cursor.line = Math.max(0, Math.min(state.cursor.line, state.buffer.length - 1));
        const line = state.buffer[state.cursor.line] || "";
        const maxCol = state.mode === "insert" ? line.length : Math.max(0, line.length - 1);
        state.cursor.col = Math.max(0, Math.min(state.cursor.col, maxCol));
    };

    // Words are [A-Za-z0-9_]+; every punctuation character is its own token.
    function tokens(buffer) {
        const result = [];
        buffer.forEach((line, lineIndex) => {
            const re = /[A-Za-z0-9_]+|[^A-Za-z0-9_\s]/g;
            let match;
            while ((match = re.exec(line)) !== null) {
                result.push({
                    line: lineIndex,
                    start: match.index,
                    end: match.index + match[0].length,
                    word: /^[A-Za-z0-9_]+$/.test(match[0]),
                });
            }
        });
        return result;
    }

    function activeToken(list, cursor) {
        return (
            list.find(
                (token) =>
                    token.line === cursor.line &&
                    cursor.col >= token.start &&
                    cursor.col < token.end,
            ) ||
            list.find((token) => token.line === cursor.line && token.start >= cursor.col) ||
            null
        );
    }

    const comparePos = (a, b) => a.line - b.line || a.col - b.col;

    function moveWord(state, direction) {
        const list = tokens(state.buffer);
        if (!list.length) return;
        const pos = state.cursor;
        const containing = list.find(
            (token) => token.line === pos.line && pos.col >= token.start && pos.col < token.end,
        );
        let target = null;

        if (direction === "w") {
            // From inside/on a token, skip to the following token. From whitespace,
            // land on the first token after the cursor instead of skipping it.
            target = containing
                ? list[list.indexOf(containing) + 1] || null
                : list.find(
                      (token) => comparePos({ line: token.line, col: token.start }, pos) > 0,
                  ) || null;
        } else if (direction === "b") {
            if (containing && pos.col > containing.start) target = containing;
            else
                target =
                    [...list]
                        .reverse()
                        .find(
                            (token) => comparePos({ line: token.line, col: token.start }, pos) < 0,
                        ) || null;
        } else if (direction === "e") {
            if (containing && pos.col < containing.end - 1) target = containing;
            else
                target =
                    list.find(
                        (token) => comparePos({ line: token.line, col: token.start }, pos) > 0,
                    ) || null;
        }

        if (!target) return;
        state.cursor.line = target.line;
        state.cursor.col =
            direction === "e" ? Math.max(target.start, target.end - 1) : target.start;
    }

    function changeInnerWord(state) {
        const line = state.buffer[state.cursor.line] || "";
        const re = /[A-Za-z0-9_]+/g;
        const words = [];
        let match;
        while ((match = re.exec(line)) !== null)
            words.push({ start: match.index, end: match.index + match[0].length });
        const token =
            words.find((word) => state.cursor.col >= word.start && state.cursor.col < word.end) ||
            words.find((word) => word.start >= state.cursor.col);
        if (!token) return;
        state.buffer[state.cursor.line] = line.slice(0, token.start) + line.slice(token.end);
        state.cursor.col = token.start;
        state.mode = "insert";
        state.pendingKey = null;
    }

    function handleKey(previous, key) {
        const state = clone(previous);

        if (key === "Escape") {
            state.mode = "normal";
            state.pendingKey = null;
            clampCursor(state);
            return state;
        }

        if (state.mode === "insert") {
            const lineIndex = state.cursor.line;
            const line = state.buffer[lineIndex] || "";
            if (key === "Backspace") {
                if (state.cursor.col > 0) {
                    state.buffer[lineIndex] =
                        line.slice(0, state.cursor.col - 1) + line.slice(state.cursor.col);
                    state.cursor.col -= 1;
                }
            } else if (key.length === 1 && key !== "\n" && key !== "\r") {
                state.buffer[lineIndex] =
                    line.slice(0, state.cursor.col) + key + line.slice(state.cursor.col);
                state.cursor.col += 1;
            }
            clampCursor(state);
            return state;
        }

        if (state.pendingKey === "f") {
            const line = state.buffer[state.cursor.line] || "";
            const found = key.length === 1 ? line.indexOf(key, state.cursor.col + 1) : -1;
            if (found >= 0) state.cursor.col = found;
            state.pendingKey = null;
            clampCursor(state);
            return state;
        }
        if (state.pendingKey === "g") {
            if (key === "g") state.cursor = { line: 0, col: 0 };
            state.pendingKey = null;
            clampCursor(state);
            return state;
        }
        if (state.pendingKey === "d") {
            if (key === "d") {
                state.buffer.splice(state.cursor.line, 1);
                if (!state.buffer.length) state.buffer = [""];
                state.cursor.col = 0;
            }
            state.pendingKey = null;
            clampCursor(state);
            return state;
        }
        if (state.pendingKey === "y") {
            if (key === "y") state.yank = state.buffer[state.cursor.line] || "";
            state.pendingKey = null;
            return state;
        }
        if (state.pendingKey === "c") {
            state.pendingKey = key === "i" ? "ci" : null;
            return state;
        }
        if (state.pendingKey === "ci") {
            if (key === "w") changeInnerWord(state);
            else state.pendingKey = null;
            clampCursor(state);
            return state;
        }

        const line = state.buffer[state.cursor.line] || "";
        switch (key) {
            case "h":
                state.cursor.col -= 1;
                break;
            case "j":
                state.cursor.line += 1;
                break;
            case "k":
                state.cursor.line -= 1;
                break;
            case "l":
                state.cursor.col += 1;
                break;
            case "w":
            case "b":
            case "e":
                moveWord(state, key);
                break;
            case "0":
                state.cursor.col = 0;
                break;
            case "$":
                state.cursor.col = Math.max(0, line.length - 1);
                break;
            case "G":
                state.cursor = { line: state.buffer.length - 1, col: 0 };
                break;
            case "g":
            case "f":
            case "d":
            case "y":
            case "c":
                state.pendingKey = key;
                break;
            case "x":
                if (line.length && state.cursor.col < line.length) {
                    state.buffer[state.cursor.line] =
                        line.slice(0, state.cursor.col) + line.slice(state.cursor.col + 1);
                }
                break;
            case "p":
                if (state.yank !== null) {
                    state.buffer.splice(state.cursor.line + 1, 0, state.yank);
                    state.cursor.line += 1;
                    state.cursor.col = 0;
                }
                break;
            case "i":
                state.mode = "insert";
                break;
            case "a":
                state.cursor.col = Math.min(line.length, state.cursor.col + 1);
                state.mode = "insert";
                break;
            case "A":
                state.cursor.col = line.length;
                state.mode = "insert";
                break;
            case "o":
                state.buffer.splice(state.cursor.line + 1, 0, "");
                state.cursor.line += 1;
                state.cursor.col = 0;
                state.mode = "insert";
                break;
            case "O":
                state.buffer.splice(state.cursor.line, 0, "");
                state.cursor.col = 0;
                state.mode = "insert";
                break;
            default:
                break; // Unsupported keys are intentionally ignored.
        }
        clampCursor(state);
        return state;
    }

    function handlesKey(state, key) {
        if (key === "Escape") return true;
        if (state.mode === "insert")
            return key === "Backspace" || (key.length === 1 && key !== "\n" && key !== "\r");
        // should not leave the learner trapped in a half-entered command.
        if (state.pendingKey) return key.length === 1;
        return "hjklwbe0$GgfdycxpioOaAI".includes(key) && key.length === 1;
    }

    function isPass(stage, state) {
        const check = stage.check;
        if (check.mode && state.mode !== check.mode) return false;
        if (check.kind === "cursor") {
            return state.cursor.line === check.at.line && state.cursor.col === check.at.col;
        }
        if (check.kind === "buffer") {
            return (
                state.buffer.length === check.equals.length &&
                state.buffer.every((line, i) => line === check.equals[i])
            );
        }
        if (check.kind === "bufferAndCursor") {
            return (
                state.buffer.length === check.equals.length &&
                state.buffer.every((line, i) => line === check.equals[i]) &&
                state.cursor.line === check.cursor.line &&
                state.cursor.col === check.cursor.col
            );
        }
        return false;
    }

    global.VimTutorialEngine = { handleKey, isPass, handlesKey, clone, tokens };
})(window);
