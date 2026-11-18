/* Interactive Vim tutorial and practice-session behavior. */
const VIM_TUTORIAL_STAGES = [
    {
        name: "Move around",
        goal: "Move down to the marker, then across to the asterisk. Use h, j, k and l — not the arrow keys.",
        initial: ["The quick brown fox", "jumps over the *", "lazy dog"],
        cursor: {
            line: 0,
            col: 0,
        },
        check: {
            kind: "cursor",
            at: {
                line: 1,
                col: 15,
            },
        },
        requiredKeys: ["j", ...Array(15).fill("l")],
        explanation:
            "h, j, k and l move left, down, up and right. They keep the movement keys beside the home row.",
    },
    {
        name: "Words",
        goal: "Move from the start of The to the start of lazy using word motions.",
        initial: ["The quick brown fox", "jumps over the", "lazy dog"],
        cursor: {
            line: 0,
            col: 0,
        },
        check: {
            kind: "cursor",
            at: {
                line: 2,
                col: 0,
            },
        },
        requiredKeys: Array(7).fill("w"),
        explanation:
            "w moves to the next word. b goes back and e moves to the end of the current word. " +
            "This stage specifically checks that you used w, not a pile of l presses.",
    },
    {
        name: "Delete a line",
        goal: "Delete the line that says DELETE ME. Keep the other two lines.",
        initial: ["keep this line", "DELETE ME", "keep this one too"],
        cursor: {
            line: 0,
            col: 0,
        },
        check: {
            kind: "buffer",
            equals: ["keep this line", "keep this one too"],
        },
        requiredKeys: ["j", "d", "d"],
        explanation: "dd deletes the current line. x deletes only the character under the cursor.",
    },
    {
        name: "Yank and put",
        goal: "Duplicate the first line so it appears twice.",
        initial: ["copy me", "leave me"],
        cursor: {
            line: 0,
            col: 0,
        },
        check: {
            kind: "buffer",
            equals: ["copy me", "copy me", "leave me"],
        },
        requiredKeys: ["y", "y", "p"],
        explanation: "yy copies the current line. p puts the copied line below the cursor.",
    },
    {
        name: "Insert text",
        goal: "Type Hello at the beginning of the line, then return to Normal mode.",
        initial: ["world"],
        cursor: {
            line: 0,
            col: 0,
        },
        check: {
            kind: "buffer",
            equals: ["Hello world"],
            mode: "normal",
        },
        requiredKeys: ["i", ...Array.from("Hello "), "Escape"],
        explanation:
            "i enters Insert mode. Escape returns to Normal mode. " +
            "Watch the status bar change color when you switch modes.",
    },
    {
        name: "Change a word",
        goal: "Replace wrong with right using ciw.",
        initial: ["this word is wrong"],
        cursor: {
            line: 0,
            col: 13,
        },
        check: {
            kind: "buffer",
            equals: ["this word is right"],
            mode: "normal",
        },
        requiredKeys: ["c", "i", "w", ...Array.from("right"), "Escape"],
        explanation:
            "ciw means change inside word. It removes the word under the cursor and puts you straight into Insert mode.",
    },
    {
        name: "Start and end of line",
        goal: "Use 0 to go to the start of the line, then $ to land on its last character.",
        initial: ["find both ends of this line"],
        cursor: {
            line: 0,
            col: 12,
        },
        check: {
            kind: "cursor",
            at: {
                line: 0,
                col: 26,
            },
        },
        requiredKeys: ["0", "$"],
        explanation:
            "0 jumps to the first column. $ moves to the last character. " +
            "You do not have to count spaces or repeatedly press l.",
    },
    {
        name: "Jump through the buffer",
        goal: "Jump to the last line with G, then return to the first line with gg.",
        initial: ["top of the file", "somewhere in the middle", "bottom of the file"],
        cursor: {
            line: 1,
            col: 4,
        },
        check: {
            kind: "cursor",
            at: {
                line: 0,
                col: 0,
            },
        },
        requiredKeys: ["G", "g", "g"],
        explanation:
            "G jumps to the last line. gg jumps back to the top. " +
            "Both are useful when you are moving around a file that is much longer than the screen.",
    },
    {
        name: "Find a character",
        goal: "Use fx to jump to the x in the line.",
        initial: ["one two x marks the spot"],
        cursor: {
            line: 0,
            col: 0,
        },
        check: {
            kind: "cursor",
            at: {
                line: 0,
                col: 8,
            },
        },
        requiredKeys: ["f", "x"],
        explanation:
            "f followed by a character jumps to the next occurrence of that character on the current line.",
    },
    {
        name: "Open a new line",
        goal: "Open a line below the first line, type middle, then return to Normal mode.",
        initial: ["top", "bottom"],
        cursor: {
            line: 0,
            col: 0,
        },
        check: {
            kind: "buffer",
            equals: ["top", "middle", "bottom"],
            mode: "normal",
        },
        requiredKeys: ["o", ...Array.from("middle"), "Escape"],
        explanation:
            "o opens a new line below the current line and enters Insert mode. O does the same above the current line.",
    },
    {
        name: "Append to a word",
        goal: "Move to the end of 'vim' with a, type !, then return to Normal mode.",
        initial: ["vim"],
        cursor: {
            line: 0,
            col: 2,
        },
        check: {
            kind: "buffer",
            equals: ["vim!"],
            mode: "normal",
        },
        requiredKeys: ["a", "!", "Escape"],
        explanation:
            "a starts inserting after the cursor. A jumps to the end of the line before inserting.",
    },
    {
        name: "Delete one character",
        goal: "Remove the extra e so the line reads file.",
        initial: ["filee"],
        cursor: {
            line: 0,
            col: 4,
        },
        check: {
            kind: "buffer",
            equals: ["file"],
        },
        requiredKeys: ["x"],
        explanation:
            "x removes the character under the cursor. " +
            "You do not have to enter Insert mode just to remove one character.",
    },
    {
        name: "Open a line above",
        goal: "Use O to add a new line above the current line, type top, and return to Normal mode.",
        initial: ["middle", "bottom"],
        cursor: {
            line: 0,
            col: 0,
        },
        check: {
            kind: "buffer",
            equals: ["top", "middle", "bottom"],
            mode: "normal",
        },
        requiredKeys: ["O", ...Array.from("top"), "Escape"],
        explanation: "O opens a line above and enters Insert mode. o opens one below.",
    },
    {
        name: "Free Play",
        goal: "Clean up the paragraph: remove the duplicate line, remove the blank line, and change teh to the.",
        initial: [
            "Keep your hands on the home row.",
            "A good editor keeps your thought moving.",
            "A good editor keeps your thought moving.",
            "Fix teh small details as you go.",
            "",
            "Then get back to building things.",
        ],
        cursor: {
            line: 0,
            col: 0,
        },
        check: {
            kind: "buffer",
            equals: [
                "Keep your hands on the home row.",
                "A good editor keeps your thought moving.",
                "Fix the small details as you go.",
                "Then get back to building things.",
            ],
        },
        requiredSequences: [
            ["d", "d"],
            ["c", "i", "w"],
        ],
        requiredSequenceCounts: {
            "d,d": 2,
            "c,i,w": 1,
        },
        explanation:
            "You used motions to clean up a document without reaching for the mouse. " +
            "Try w, dd and ciw in your editor or IDE.",
    },
];
let vimAdvanceTimer = null;
function initVimTutorial(query) {
    if (vimAdvanceTimer) clearTimeout(vimAdvanceTimer);
    const root = $("#vim-tutorial");
    const body = $("#vim-tutorial-body");
    if (!root || !body || !window.VimTutorialEngine) return;
    const engine = window.VimTutorialEngine;
    const free = root.dataset.free === "true";
    const progressKey = "vim-motions-tutorial-progress";
    let saved = {};
    try {
        saved = JSON.parse(localStorage.getItem(progressKey) || "{}");
    } catch (_) {}
    const requestedStage = Number(query.get("stage"));
    let stageIndex = free
        ? -1
        : Number.isInteger(requestedStage) &&
            requestedStage >= 1 &&
            requestedStage <= VIM_TUTORIAL_STAGES.length
          ? requestedStage - 1
          : Math.max(0, Math.min(VIM_TUTORIAL_STAGES.length - 1, Number(saved.stage) || 0));
    let state,
        keys = [],
        locked = false,
        focused = false,
        mobilePane = "you",
        helpOpen = false;
    const freeSeed = [
        "This is a scratch buffer.",
        "Try w, b, e, dd, ciw, yy, p, a and x.",
        "Escape returns to Normal mode.",
    ];
    const makeInitialState = () => {
        const source = free
            ? {
                  initial: freeSeed,
                  cursor: {
                      line: 0,
                      col: 0,
                  },
              }
            : VIM_TUTORIAL_STAGES[stageIndex];
        return {
            buffer: [...source.initial],
            cursor: {
                ...source.cursor,
            },
            mode: "normal",
            yank: null,
            pendingKey: null,
        };
    };
    const stage = () => (free ? null : VIM_TUTORIAL_STAGES[stageIndex]);
    const target = () => {
        if (free)
            return {
                lines: [
                    "h j k l   move",
                    "w b e     words",
                    "0 $ gg G  line / buffer",
                    "f<char>   find on line",
                    "x dd      delete",
                    "yy p      copy / put",
                    "i Esc     insert / return",
                    "ciw       change inside word",
                ],
                cursor: null,
            };
        const check = stage().check;
        if (check.kind === "cursor")
            return {
                lines: [...stage().initial],
                cursor: check.at,
            };
        return {
            lines: [...check.equals],
            cursor: check.cursor || null,
        };
    };
    const keyLabel = (key) =>
        key === "Escape" ? "Esc" : key === "Backspace" ? "⌫" : key === " " ? "Space" : key;
    const renderTextBuffer = (lines, cursor, mode, isGoal = false) =>
        lines
            .map((line, lineIndex) => {
                const chars = Array.from(line);
                let content = "";
                for (let col = 0; col < chars.length; col++) {
                    if (
                        !isGoal &&
                        cursor &&
                        cursor.line === lineIndex &&
                        cursor.col === col &&
                        mode === "insert"
                    )
                        content += '<i class="vim-insert-cursor" aria-hidden="true"></i>';
                    const char = chars[col] === " " ? "&nbsp;" : esc(chars[col]);
                    const atLive =
                        !isGoal &&
                        cursor &&
                        cursor.line === lineIndex &&
                        cursor.col === col &&
                        mode === "normal";
                    const atGoal =
                        isGoal && cursor && cursor.line === lineIndex && cursor.col === col;
                    content += `<span class="${
                        atLive ? "vim-cursor-block" : atGoal ? "vim-goal-marker" : "vim-char"
                    }">${char}</span>`;
                }
                if (!chars.length)
                    content =
                        cursor && cursor.line === lineIndex && mode === "normal" && !isGoal
                            ? '<span class="vim-cursor-block">&nbsp;</span>'
                            : "&nbsp;";
                if (
                    !isGoal &&
                    cursor &&
                    cursor.line === lineIndex &&
                    cursor.col >= chars.length &&
                    mode === "insert"
                )
                    content += '<i class="vim-insert-cursor" aria-hidden="true"></i>';
                if (
                    !isGoal &&
                    cursor &&
                    cursor.line === lineIndex &&
                    cursor.col >= chars.length &&
                    mode === "normal" &&
                    chars.length
                )
                    content = content.replace(
                        /<\/span>$/,
                        '<span class="vim-cursor-block">&nbsp;</span>',
                    );
                return joinHtml(
                    `<div class="vim-line"><span class="vim-line-number">${String(lineIndex + 1).padStart(2, "0")}</span>`,
                    `<span class="vim-line-text">${content}</span></div>`,
                );
            })
            .join("");
    const render = () => {
        const goal = target();
        const mode = state.mode;
        $("#vim-goal-buffer").innerHTML = renderTextBuffer(goal.lines, goal.cursor, "normal", true);
        $("#vim-buffer").innerHTML = renderTextBuffer(state.buffer, state.cursor, mode, false);
        $("#vim-stage-count").textContent = free
            ? "FREE PLAY"
            : `STAGE ${stageIndex + 1}/${VIM_TUTORIAL_STAGES.length}`;
        $("#vim-stage-name").textContent = free ? "No goal. Just practice." : stage().name;
        $("#vim-goal-copy").textContent = free
            ? "Try the motions on your own text. This pane is a quick reference."
            : stage().goal;
        const keyHistory = keys.length
            ? keys
                  .slice(-12)
                  .map((key) => `<span>${esc(keyLabel(key))}</span>`)
                  .join("<i>·</i>")
            : '<span class="vim-key-placeholder">Your keystrokes will show up here · :w saves · :q resets</span>';
        const successMark = locked ? '<strong class="vim-key-success">✓</strong>' : "";
        $("#vim-keys").innerHTML = joinHtml(keyHistory, successMark);
        $("#vim-hint").hidden = focused;
        $("#vim-buffer").classList.toggle("has-focus", focused);
        $("#vim-mode-label").textContent =
            mode === "insert" ? "-- INSERT --" : free ? "-- FREE PLAY --" : "-- NORMAL --";
        $("#vim-tutorial-status").classList.toggle("insert-mode", mode === "insert");
        $("#vim-tutorial-status").classList.toggle("free-mode", free);
        $("#vim-stage-position").textContent = free
            ? "scratch buffer"
            : `${stageIndex + 1}/${VIM_TUTORIAL_STAGES.length} · ${stage().name}`;
        $("#vim-explanation").hidden = !locked || free;
        if (locked && !free) $("#vim-explanation-copy").textContent = stage().explanation;
        $("#vim-next").hidden = !locked || free;
        $("#vim-help").hidden = !helpOpen;
        if (helpOpen) $("#vim-help").focus();
        document.querySelectorAll("[data-vim-pane]").forEach((button) => {
            const active = button.dataset.vimPane === mobilePane;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });
        $("#vim-goal-pane").classList.toggle("mobile-hidden", mobilePane !== "goal");
        $("#vim-you-pane").classList.toggle("mobile-hidden", mobilePane !== "you");
    };
    const reset = () => {
        if (vimAdvanceTimer) clearTimeout(vimAdvanceTimer);
        vimAdvanceTimer = null;
        state = makeInitialState();
        keys = [];
        locked = false;
        helpOpen = false;
        render();
        if (!free) {
            try {
                localStorage.setItem(
                    progressKey,
                    JSON.stringify({
                        stage: stageIndex,
                        completed: false,
                    }),
                );
            } catch (_) {}
        }
    };
    const finish = () => {
        if (vimAdvanceTimer) clearTimeout(vimAdvanceTimer);
        vimAdvanceTimer = null;
        try {
            localStorage.setItem(
                progressKey,
                JSON.stringify({
                    stage: VIM_TUTORIAL_STAGES.length - 1,
                    completed: true,
                }),
            );
        } catch (_) {}
        body.innerHTML = joinHtml(
            `<section class="vim-completion"><div class="vim-completion-mark">✓</div>`,
            `<div class="page-eyebrow">~/vim · completed</div><h2>You made it through the basics.</h2>`,
            `<p>You moved around a file, jumped between words and lines, changed text, deleted lines, copied them, `,
            `and opened new lines. You can use these motions in VS Code with an extension or in Neovim.</p>`,
            `<h3>The motions you tried</h3><div class="vim-motion-list"><span><kbd>h j k l</kbd> move</span><span>`,
            `<kbd>w b e</kbd> words</span><span><kbd>0 $</kbd> line start / end</span><span>`,
            `<kbd>gg G</kbd> file start / end</span><span><kbd>f{char}</kbd> find a character</span><span>`,
            `<kbd>x dd</kbd> delete</span><span><kbd>yy p</kbd> yank and put</span><span>`,
            `<kbd>i Esc</kbd> insert mode</span><span><kbd>ciw</kbd> change inside word</span><span>`,
            `<kbd>a A</kbd> append</span><span><kbd>o O</kbd> open a line</span></div><div class="btns">`,
            `<a class="btn" href="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim" `,
            `target="_blank" rel="noopener">Vim extension for VS Code ↗</a>`,
            `<a class="btn alt" href="https://neovim.io/doc/user/" target="_blank" rel="noopener">Neovim :help `,
            `↗</a>`,
            `<a class="btn alt" href="https://github.com/abdurisaq/.dotfiles" target="_blank" rel="noopener">My `,
            `dotfiles ↗</a><button class="btn alt" id="vim-again" type="button">Run it again</button></div>`,
            `</section>`,
        );
        $("#vim-again").addEventListener("click", () => {
            try {
                localStorage.setItem(
                    progressKey,
                    JSON.stringify({
                        stage: 0,
                        completed: false,
                    }),
                );
            } catch (_) {}
            location.hash = "#/vim/play?stage=1";
        });
    };
    const advance = () => {
        if (vimAdvanceTimer) clearTimeout(vimAdvanceTimer);
        vimAdvanceTimer = null;
        if (stageIndex >= VIM_TUTORIAL_STAGES.length - 1) {
            finish();
            return;
        }
        stageIndex += 1;
        try {
            localStorage.setItem(
                progressKey,
                JSON.stringify({
                    stage: stageIndex,
                    completed: false,
                }),
            );
        } catch (_) {}
        reset();
        setTimeout(() => $("#vim-buffer")?.focus(), 0);
    };
    const matchesSequence = (trace, sequence) => {
        for (let i = 0; i <= trace.length - sequence.length; i++)
            if (sequence.every((key, j) => trace[i + j] === key)) return true;
        return false;
    };
    const stageActionsMatch = () => {
        if (free) {
            const required = stage()?.requiredSequences || [];
            const counts = stage()?.requiredSequenceCounts || {};
            if (!required.every((sequence) => matchesSequence(keys, sequence))) return false;
            return Object.entries(counts).every(([sequence, count]) => {
                const parts = sequence.split(",");
                let found = 0;
                for (let i = 0; i <= keys.length - parts.length; i++)
                    if (parts.every((key, j) => keys[i + j] === key)) found++;
                return found >= count;
            });
        }
        const required = stage()?.requiredKeys;
        return (
            !required ||
            (required.length === keys.length && required.every((key, i) => keys[i] === key))
        );
    };
    const showVimCommand = () => {
        const row = $("#vim-play-command");
        row.hidden = false;
        const input = $("#vim-play-command-input");
        input.value = "";
        input.focus();
    };
    const closeVimCommand = () => {
        $("#vim-play-command").hidden = true;
        buffer().focus();
    };
    const runVimCommand = (raw) => {
        const command = raw.trim().replace(/^:/, "").toLowerCase();
        if (command === "w" || command === "write") {
            const correct = !free && engine.isPass(stage(), state) && stageActionsMatch();
            if (correct) {
                locked = true;
                $("#vim-play-command").hidden = true;
                render();
                $("#vim-next").focus();
            } else {
                $("#vim-play-command-message").textContent = free
                    ? "Free Play has no save target. Keep editing or use :q to reset."
                    : "Not yet. The buffer and the required motions both need to match. Use :q to reset this stage.";
                $("#vim-play-command-message").hidden = false;
            }
            return;
        }
        if (command === "q" || command === "quit") {
            $("#vim-play-command").hidden = true;
            reset();
            buffer().focus();
            return;
        }
        if (command === "qa" || command === "qall") {
            location.hash = "#/vim";
            return;
        }
        if (command === "help" || command === "h") {
            $("#vim-play-command").hidden = true;
            helpOpen = true;
            render();
            return;
        }
        $("#vim-play-command-message").textContent = `E492: Not an editor command: ${command}`;
        $("#vim-play-command-message").hidden = false;
    };
    const onKey = (event) => {
        const key = event.key;
        // The tutorial does not bind browser/system modifier shortcuts.
        if (event.ctrlKey || event.metaKey || event.altKey) {
            event.stopPropagation();
            return;
        }
        if (key === ":" && state.mode === "normal" && !state.pendingKey) {
            event.preventDefault();
            event.stopPropagation();
            showVimCommand();
            return;
        }
        if (key === "/" && state.mode === "normal" && !state.pendingKey) {
            event.preventDefault();
            event.stopPropagation();
            openSearch("grep");
            return;
        }
        if (helpOpen) {
            if (key === "Escape" || key === "?") {
                event.preventDefault();
                event.stopPropagation();
                helpOpen = false;
                render();
                buffer().focus();
            }
            return;
        }
        if (key === "Escape" && state.mode === "normal") {
            event.preventDefault();
            event.stopPropagation();
            reset();
            return;
        }
        if (key === "r" && state.mode === "normal" && !state.pendingKey) {
            event.preventDefault();
            event.stopPropagation();
            reset();
            return;
        }
        if (key === "?" && state.mode === "normal" && !state.pendingKey) {
            event.preventDefault();
            event.stopPropagation();
            helpOpen = true;
            render();
            return;
        }
        if (locked) {
            if (key === "Enter") {
                event.preventDefault();
                event.stopPropagation();
                advance();
            }
            return;
        }
        if (!engine.handlesKey(state, key)) {
            if (key.startsWith("Arrow") || key === "Tab" || key === "Enter") event.preventDefault();
            event.stopPropagation();
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        state = engine.handleKey(state, key);
        keys.push(key);
        render();
    };
    if (free) {
        body.innerHTML = joinHtml(
            `<div class="vim-stage-toolbar"><span class="vim-stage-badge" id="vim-stage-count">FREE PLAY</span>`,
            `</div>${tutorialMarkup()}`,
        );
    } else {
        if (saved.completed && !query.has("stage")) {
            finish();
            return;
        }
        body.innerHTML = joinHtml(
            `<div class="vim-stage-toolbar"><span class="vim-stage-badge" id="vim-stage-count"></span></div>`,
            `${tutorialMarkup()}`,
        );
    }
    function tutorialMarkup() {
        return joinHtml(
            `<div class="vim-stage-intro"><h2 id="vim-stage-name"></h2><p id="vim-goal-copy"></p></div>`,
            `<div class="vim-pane-switch">`,
            `<button type="button" data-vim-pane="goal" aria-pressed="false">GOAL</button>`,
            `<button type="button" data-vim-pane="you" class="active" aria-pressed="true">YOU</button></div>`,
            `<div class="vim-two-pane"><section class="vim-pane" id="vim-goal-pane"><header>`,
            `<strong>[ GOAL ]</strong><span>target state</span></header>`,
            `<div class="vim-text-buffer vim-goal-buffer" id="vim-goal-buffer"></div></section>`,
            `<section class="vim-pane" id="vim-you-pane"><header><strong>[ YOU ]</strong>`,
            `<span>editable buffer</span></header>`,
            `<div class="vim-buffer vim-text-buffer" id="vim-buffer" tabindex="0" aria-label="Vim practice buffer. `,
            `Click here and type Vim motions."></div>`,
            `<div class="vim-hint" id="vim-hint">Click here to start typing</div>`,
            `<div class="vim-key-strip" id="vim-keys"></div></section></div>`,
            `<div class="vim-tutorial-status" id="vim-tutorial-status">`,
            `<strong id="vim-mode-label">-- NORMAL --</strong><span id="vim-stage-position"></span>`,
            `<span class="vim-status-spacer"></span><button type="button" id="vim-help-button">? help</button>`,
            `<button type="button" id="vim-reset-button">r restart</button></div>`,
            `<div class="vim-play-command" id="vim-play-command" hidden><span>:</span>`,
            `<input id="vim-play-command-input" aria-label="Vim tutorial command" autocomplete="off" `,
            `spellcheck="false"><span class="vim-play-command-hint">:w save · :q reset · :qa exit</span></div>`,
            `<p class="vim-play-command-message" id="vim-play-command-message" hidden></p>`,
            `<section class="vim-explanation" id="vim-explanation" hidden>`,
            `<div class="vim-explanation-check">✓ Nice.</div><p id="vim-explanation-copy"></p>`,
            `<button class="btn" id="vim-next" type="button" hidden>Next stage ↗</button></section>`,
            `<div class="vim-help" id="vim-help" tabindex="-1" hidden><div class="vim-help-card">`,
            `<div class="dialog-heading"><h2>Motion cheat sheet</h2>`,
            `<button type="button" class="subtle-button" id="vim-help-close">×</button></div>`,
            `<div class="vim-motion-list"><span><kbd>h j k l</kbd> move</span><span>`,
            `<kbd>w b e</kbd> word navigation</span><span><kbd>0 $</kbd> line start / end</span><span>`,
            `<kbd>gg G</kbd> buffer start / end</span><span><kbd>f + character</kbd> find character</span><span>`,
            `<kbd>x dd</kbd> delete character / line</span><span><kbd>yy p</kbd> copy line / put below</span>`,
            `<span><kbd>i Esc</kbd> insert / return to Normal</span><span><kbd>ciw</kbd> change inside word</span>`,
            `<span><kbd>a A</kbd> append after cursor / at line end</span><span>`,
            `<kbd>o O</kbd> open a line below / above</span></div>`,
            `<p>Type <kbd>:w</kbd> and press Enter to submit. <kbd>:q</kbd> resets the current stage. `,
            `<kbd>:qa</kbd> leaves the tutorial. Press <kbd>Esc</kbd> in Insert mode to return to Normal.</p>`,
            `</div></div>`,
        );
    }
    const buffer = () => $("#vim-buffer");
    buffer().addEventListener("focus", () => {
        focused = true;
        $("#vim-hint").hidden = true;
        buffer().classList.add("has-focus");
    });
    buffer().addEventListener("blur", () => {
        focused = false;
        $("#vim-hint").hidden = false;
        buffer().classList.remove("has-focus");
    });
    buffer().addEventListener("keydown", onKey, true);
    $("#vim-play-command-input").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            runVimCommand(event.target.value);
        } else if (event.key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
            closeVimCommand();
        }
    });
    $("#vim-reset-button").addEventListener("click", reset);
    $("#vim-help-button").addEventListener("click", () => {
        helpOpen = true;
        render();
    });
    // Advance on pointerdown so the stage transition is not lost if the button
    // moves as it takes focus. Keyboard activation produces a click with detail=0.
    $("#vim-next").addEventListener("pointerdown", (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        advance();
    });
    $("#vim-next").addEventListener("click", (event) => {
        if (event.detail === 0) advance();
    });
    $("#vim-help-close").addEventListener("click", () => {
        helpOpen = false;
        render();
        buffer().focus();
    });
    $("#vim-help").addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                helpOpen = false;
                render();
                buffer().focus();
            }
        },
        true,
    );
    document.querySelectorAll("[data-vim-pane]").forEach((button) =>
        button.addEventListener("click", () => {
            mobilePane = button.dataset.vimPane;
            render();
        }),
    );
    reset();
}
