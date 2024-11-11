/* Summary: This component contains a Tetris game widget in the footer. */
Vue.component("simple_footer_component_1724097556", {
    template: `
    <footer id="footer-section" class="flex-1 bg-white dark:bg-gray-800">
        <div id="footer-container" class="max-w-screen-xl p-4 py-6 mx-auto lg:py-16 md:p-8 lg:p-10">
            <div id="footer-content" class="text-center">
                <h2 class="text-2xl font-bold mb-4">Email Santa</h2>
                <form @submit.prevent="sendEmailToSanta" class="w-64 mx-auto bg-gray-100 rounded-lg shadow-lg p-4">
                    <input v-model="name" type="text" placeholder="Your Name" class="w-full mb-2 p-2 rounded" required>
                    <textarea v-model="message" placeholder="Your Message to Santa" class="w-full mb-2 p-2 rounded" rows="4" required></textarea>
                    <button type="submit" class="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                        <i class='bx bx-envelope mr-2'></i>Send to Santa
                    </button>
                </form>
            </div>
            <hr id="footer-divider" class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8">
            <div class="flex">
                <div id="footer-text" class="flex-1 block text-sm text-center text-gray-500 dark:text-gray-400">
                    © 2023 ThroneMart. Elevating your bathroom experience, one flush at a time.
                </div>
            </div>
        </div>
    </footer>
    `,
    data() {
        return {
            name: '',
            message: '',
        };
    },
    methods: {
        sendEmailToSanta() {
            // Send email logic here
            console.log(`Sending email to Santa from ${this.name}: ${this.message}`);
            alert('Your message has been sent to Santa!');
            this.name = '';
            this.message = '';
        },
        // Start of existing methods
            const canvas = document.getElementById('tetris-canvas');
            const ctx = canvas.getContext('2d');
            const BLOCK_SIZE = 20;
            const BOARD_WIDTH = 10;
            const BOARD_HEIGHT = 20;

            // Tetris game logic
            this.game = {
                board: Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0)),
                piece: null,
                score: 0,

                start() {
                    this.board = Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
                    this.piece = this.randomPiece();
                    this.score = 0;
                    this.gameLoop();
                },

                randomPiece() {
                    const pieces = [
                        [[1, 1, 1, 1]],
                        [[1, 1], [1, 1]],
                        [[1, 1, 1], [0, 1, 0]],
                        [[1, 1, 1], [1, 0, 0]],
                        [[1, 1, 1], [0, 0, 1]],
                        [[1, 1, 0], [0, 1, 1]],
                        [[0, 1, 1], [1, 1, 0]]
                    ];
                    return pieces[Math.floor(Math.random() * pieces.length)];
                },

                moveDown() {
                    this.piece.y++;
                    if (this.collision()) {
                        this.piece.y--;
                        this.merge();
                        this.piece = this.randomPiece();
                        if (this.collision()) {
                            // Game over
                            return false;
                        }
                    }
                    return true;
                },

                moveLeft() {
                    this.piece.x--;
                    if (this.collision()) {
                        this.piece.x++;
                    }
                },

                moveRight() {
                    this.piece.x++;
                    if (this.collision()) {
                        this.piece.x--;
                    }
                },

                rotate() {
                    const rotated = this.piece.shape[0].map((_, i) =>
                        this.piece.shape.map(row => row[i]).reverse()
                    );
                    const previousShape = this.piece.shape;
                    this.piece.shape = rotated;
                    if (this.collision()) {
                        this.piece.shape = previousShape;
                    }
                },

                collision() {
                    for (let y = 0; y < this.piece.shape.length; y++) {
                        for (let x = 0; x < this.piece.shape[y].length; x++) {
                            if (this.piece.shape[y][x] &&
                                (this.board[y + this.piece.y] &&
                                this.board[y + this.piece.y][x + this.piece.x]) !== 0) {
                                return true;
                            }
                        }
                    }
                    return false;
                },

                merge() {
                    for (let y = 0; y < this.piece.shape.length; y++) {
                        for (let x = 0; x < this.piece.shape[y].length; x++) {
                            if (this.piece.shape[y][x]) {
                                this.board[y + this.piece.y][x + this.piece.x] = 1;
                            }
                        }
                    }
                    this.clearLines();
                },

                clearLines() {
                    for (let y = this.board.length - 1; y >= 0; y--) {
                        if (this.board[y].every(value => value !== 0)) {
                            this.board.splice(y, 1);
                            this.board.unshift(Array(BOARD_WIDTH).fill(0));
                            this.score += 100;
                        }
                    }
                },

                draw() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    this.drawBoard();
                    this.drawPiece();
                },

                drawBoard() {
                    for (let y = 0; y < this.board.length; y++) {
                        for (let x = 0; x < this.board[y].length; x++) {
                            if (this.board[y][x]) {
                                ctx.fillStyle = 'blue';
                                ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                                ctx.strokeStyle = 'white';
                                ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                            }
                        }
                    }
                },

                drawPiece() {
                    for (let y = 0; y < this.piece.shape.length; y++) {
                        for (let x = 0; x < this.piece.shape[y].length; x++) {
                            if (this.piece.shape[y][x]) {
                                ctx.fillStyle = 'red';
                                ctx.fillRect((this.piece.x + x) * BLOCK_SIZE, (this.piece.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                                ctx.strokeStyle = 'white';
                                ctx.strokeRect((this.piece.x + x) * BLOCK_SIZE, (this.piece.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                            }
                        }
                    }
                },

                gameLoop() {
                    this.draw();
                    if (this.moveDown()) {
                        setTimeout(() => this.gameLoop(), 500);
                    } else {
                        alert('Game Over! Score: ' + this.score);
                    }
                }
            };

            document.addEventListener('keydown', event => {
                if (!this.game.piece) return;
                if (event.key === 'ArrowLeft') this.game.moveLeft();
                if (event.key === 'ArrowRight') this.game.moveRight();
                if (event.key === 'ArrowDown') this.game.moveDown();
                if (event.key === 'ArrowUp') this.game.rotate();
                this.game.draw();
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initTetris();
        });
    }
});
