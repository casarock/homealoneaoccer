game.module(
	'game.ball'
).require(
	'engine.renderer'
).body(function() {

	game.createClass('Ball', 'Sprite', {
		interactive: true,
		active: true,
		randomVelocityYMin: 800,
		randomVelocityYMax: 850,
		velocityX: 400,
		ground: 480,
		startY: 200,
		startYMax: 200 + 50,
		startX: 232,

		init: function(x, y) {
			this.ground = game.system.height - 80;

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
					x: 1000,
					y: 1000
				},
				velocity: {
					x: this.velocityX,
					y: 0
				},
				collisionGroup: 1,
				collideAgainst: [0],
				mass: 1.3
			});

			this.smokeEmitter = new game.Emitter({
				rotate: 0,
				endAlpha: 0,
				count: 32,
				rate: 0.5,
				duration: 500,
				life: 250,
				textures: ['particle.png']
			});

			this.body.addShape(new game.Rectangle(15, 15));
			this.body.collide = this.collide.bind(this);

			this.smokeEmitter.addTo(game.scene.stage);
			game.scene.addEmitter(this.smokeEmitter);

			game.scene.world.addBody(this.body);
			game.scene.stage.addChild(this);
			game.scene.addObject(this);

		},

		collide: function(opponent) {
			this.randomVelocityY = this.getRandomVelocityY();
			this.body.velocity.x *= -1;
			this.emmitParticles(16, 8);
		},

		update: function() {
			var rotationFactor = this.body.velocity.x > 0 ? 1 : -1,
			outOfBounds =  this.body.position.x > game.system.width - 8
						|| this.body.position.x < 8;

			if (outOfBounds) {
				if (this.body.position.x > game.system.width - 8) {
					this.body.position.x = game.system.width - 8;
					this.body.velocity.x *= -1;
					this.randomVelocityY = this.getRandomVelocityY();
					this.emmitParticles(16, 8);
				} else {
					this.reset();
				}
			}

			if (this.body.position.y > this.ground) {
				this.body.velocity.y = this.getRandomVelocityY();
				this.emmitParticles(16, 0, 8);
			}

			this.rotation += 0.1 * rotationFactor;
			this.position.x = this.body.position.x;
			this.position.y = this.body.position.y;
		},

		emmitParticles: function(num, offsetX, offsetY) {
			num = num || 16;
			offsetX = offsetX || 0;
			offsetY = offsetY || 0;

			this.smokeEmitter.position.x = this.body.position.x + offsetX;
			this.smokeEmitter.position.y = this.body.position.y + offsetY;
			this.smokeEmitter.emit(num);
		},

		getRandomVelocityY: function() {
			return (
				Math.random() * (this.randomVelocityYMax - this.randomVelocityYMin)
				+ this.randomVelocityYMin
				) * -1;
		},

		getRandomStartPosition: function() {
			value = parseInt(
				Math.random() * (this.startYMax - this.startY)
				+ this.startYMax
			);

			return value;
		},

		reset: function() {
			this.body.position.x = 320-17;
			this.body.position.y = this.getRandomStartPosition();
		}

	});
});
