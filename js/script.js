function game() {
    if ($(".game-btn").text() == "Restart") {
        location.reload();
    }
    hasStarted = true;

    var game_btn = $('.game-btn');
    $(".game-btn-container").animate({
        opacity: '0'
    });
    setTimeout(removeBtn, 1000);

    function removeBtn() {
        game_btn.css('top', parseInt(game_btn.css('top')) + 10000);
    }

    // Objects
    var container = $('#container');
    var bird = $('#bird');
    var pipe = $('.pipe');
    var pipe_1 = $('#pipe_1');
    var pipe_2 = $('#pipe_2');
    var score = $('.score');

    // Container Props
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());

    // Bird Props
    var bird_left = parseInt(bird.css('left'));
    var bird_height = parseInt(bird.height());

    // Pipe Props
    var pipe_initial_position = parseInt(pipe.css('right'));
    var pipe_initial_height = parseInt(pipe.css('height'));

    // Boolean Vars
    var jump = false;

    // Speed Vars
    var gravity = 6;
    var speed = 5;
    var velY = 9;

    // Counters
    var jumpCounter = 0;

    $(window).keydown(function (e) {
        if (e.keyCode == 38) {
            if (!jump) {
                jump = true;
            }
        }
    })

    function animate() {
        requestAnimationFrame(animate);

        if (hasCollided(bird, pipe_1) || hasCollided(bird, pipe_2) || parseInt(bird.css('top')) <= 0 || parseInt(bird.css('top')) > container_height - bird_height) {
            $(".game-btn").text("Restart");
            $(".game-btn-container").animate({
                opacity: '1'
            });
            isDead = true;
            return;
        }

        /* Birdy */
        // Apply Gravity
        bird.css('top', parseInt(bird.css('top')) + gravity);

        // Jump
        if (jump) {
            jumpCounter++;
            if (jumpCounter <= 30) {
                bird.css('top', parseInt(bird.css('top')) - velY);
            } else {
                jumpCounter = 0;
                jump = false;
            }
        }

        /* Pipes */
        var pipe_current_position = parseInt(pipe.css('right'));

        //check whether the pipes went out of the container
        if (pipe_current_position > container_width) {
            var new_height = parseInt(Math.random() * 100);

            //change the pipe's height
            pipe_1.css('height', pipe_initial_height + new_height);
            pipe_2.css('height', pipe_initial_height - new_height);

            pipe_current_position = pipe_initial_position;
        }

        //move the pipes
        pipe.css('right', pipe_current_position + speed);
    }

    animate();
}

function hasCollided(bird, pipe) {
    var x1 = bird.offset().left;
    var y1 = bird.offset().top;
    var w1 = bird.outerWidth(true);
    var h1 = bird.outerHeight(true);

    var x2 = pipe.offset().left;
    var y2 = pipe.offset().top;
    var w2 = pipe.outerWidth(true);
    var h2 = pipe.outerHeight(true);

    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
        return false;
    }

    return true;
}