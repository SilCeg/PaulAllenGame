document.addEventListener("DOMContentLoaded", function() {
    // Define as dimensões da caixa de jogo
    var gameBoardWidth = document.querySelector('.game-board').offsetWidth;
    var gameBoardHeight = document.querySelector('.game-board').offsetHeight;
    var playerRight = document.getElementById('player-right');
    var playerLeft = document.getElementById('player-left');
    var playerSpeed = 30; // Velocidade de movimento do jogador
    var playerPosition = 0; // Posição inicial do jogador

    // Função para atualizar a posição da impressora
    function updatePrinterPosition() {
        var printer = document.getElementById('impressora');
        
        // Define uma posição aleatória para a impressora na horizontal
        var randomHorizontalPosition = Math.floor(Math.random() * (gameBoardWidth - printer.offsetWidth));
        printer.style.left = randomHorizontalPosition + 'px';
        
        // Define a posição inicial da impressora no topo da caixa de jogo
        printer.style.top = '-100px'; // Inicia acima da caixa de jogo

        // Inicia a animação da queda da impressora
        var initialTopPosition = -100; // Posição inicial no topo
        var finalTopPosition = gameBoardHeight; // Posição final na parte inferior da caixa de jogo
        var speed = 5; // Velocidade da queda
        
        function dropPrinter() {
            initialTopPosition += speed; // Atualiza a posição inicial para a próxima quadro da animação
            printer.style.top = initialTopPosition + 'px'; // Atualiza a posição da impressora
            if (initialTopPosition < finalTopPosition) {
                // Se a impressora ainda não atingiu a parte inferior da caixa de jogo, continua a animação
                requestAnimationFrame(dropPrinter);
            } else {
                // Se a impressora atingiu a parte inferior da caixa de jogo, chama a função para atualizar a posição novamente
                updatePrinterPosition();
            }
        }
        // Inicia a animação da queda da impressora
        dropPrinter();
    }

    // Chama a função inicialmente
    updatePrinterPosition();

    // Função para mover o jogador para a direita
    function movePlayerRight() {
        if (playerPosition < gameBoardWidth - playerRight.offsetWidth) {
            playerPosition += playerSpeed;
            playerRight.style.left = playerPosition + 'px';
            playerLeft.style.left = playerPosition + 'px';
        }
    }

    // Função para mover o jogador para a esquerda
    function movePlayerLeft() {
        if (playerPosition > 0) {
            playerPosition -= playerSpeed;
            playerRight.style.left = playerPosition + 'px';
            playerLeft.style.left = playerPosition + 'px';
        }
    }

    // Evento de teclado para mover o jogador
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight') {
            playerRight.style.display = 'block';
            playerLeft.style.display = 'none';
            movePlayerRight();
        } else if (event.key === 'ArrowLeft') {
            playerRight.style.display = 'none';
            playerLeft.style.display = 'block';
            movePlayerLeft();
        }
    });

    // Define a posição inicial do jogador na horizontal
    playerRight.style.left = playerPosition + '500px';
    playerLeft.style.left = playerPosition + '500px';
});