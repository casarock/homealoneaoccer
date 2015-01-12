game.module(
    'game.objects'
).require(
    'engine.renderer'
).body(function() {

    game.createClass('Player', 'Sprite', {
        jumpPower: 600,
        playerGround: 0,

        init: function(x, y) {
            this._super('player_sprite.png', x, y, {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            });

            this.position = {
                x: x,
                y: y
            };

            this.body = new game.Body({
                position: {
                    x: x,
                    y: y
                },
                velocityLimit: {
                    x: 150,
                    y: 1000
                },
                velocity: {
                    x: 0,
                    y: 0
                },
                collisionGroup: 0,
                mass: 1
            });

            this.body.addShape(new game.Rectangle(16, 72));

            game.scene.world.addBody(this.body);
            game.scene.stage.addChild(this);
            game.scene.addObject(this);

            this.playerGround = game.system.height - 72;
        },

        update: function() {
            if (this.body.position.y >= this.playerGround) {
                this.body.velocity.y = 0;
                this.body.position.y = this.playerGround;
            }
            this.position.x = this.body.position.x;
            this.position.y = this.body.position.y;

        },

        jump: function() {
            if (this.body.position.y < 200) return;
            this.body.velocity.y = -this.jumpPower;
        }
    });

    game.createClass('Ball', 'Sprite', {
        interactive: true,
        active: true,
        randomVelocityY: 700,

        init: function(x, y) {
            this._super('ball_16_2.png', x, y, {
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            });

            this.position = {
                x: x,
                y: y
            };

            this.body = new game.Body({
                position: {
                    x: x,
                    y: y
                },
                velocityLimit: {
                    x: 150,
                    y: 1000
                },
                velocity: {
                    x: 150,
                    y: 0
                },
                collisionGroup: 1,
                collideAgainst: [0],
                mass: 1
            });

            this.body.addShape(new game.Rectangle(15, 15));
            this.body.collide = this.collide.bind(this);

            game.scene.world.addBody(this.body);
            game.scene.stage.addChild(this);
            game.scene.addObject(this);

        },

        collide: function(opponent) {
            this.randomVelocityY = Math.random() * (800 - 700) + 700;
            this.body.velocity.x *= -1;
        },

        update: function() {
            var rotationFactor = this.body.velocity.x > 0 ? 1 : -1;

            if (this.body.position.x > game.system.width - 8 || this.body.position.x < 8) {
                this.body.velocity.x *= -1;
                this.randomVelocityY = Math.random() * (800 - 700) + 700;
            }

            if (this.body.position.y > game.system.height) {
                this.body.velocity.y = -this.randomVelocityY;
            }

            this.rotation += 0.1 * rotationFactor;
            this.position.x = this.body.position.x;
            this.position.y = this.body.position.y;

        }

    });

});
