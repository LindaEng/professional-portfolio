import Player from './Player.js'
import Resource from './Resource.js'

export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene")
    }

    preload() {
        Player.preload(this)
        Resource.preload(this)
        this.load.image('tiles', 'assets/images/RPG Nature Tileset.png')
        this.load.tilemapTiledJSON('map', 'assets/images/map.json')
        
    }

    create() {
        const map = this.make.tilemap({key: 'map'})
        this.map = map

        const tileset = map.addTilesetImage('RPG Nature Tileset', 'tiles', 32, 32, 0, 0)
        const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0)
        const layer2 = map.createStaticLayer('Tile Layer 2', tileset, 0, 0)
        layer1.setCollisionByProperty({collides: true})
        this.matter.world.convertTilemapLayer(layer1)

        this.addResources()

        this.player = new Player({scene: this, x: 100, y: 100, texture: 'female', frame: 'townsfolk_f_idle_1'});

        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })
    }

    addResources() {
        const resources = this.map.getObjectLayer('Resources')
        // const tree = resources.objects.filter((zone) => zone.class === 'tree');

        
        resources.objects.forEach( resource => {
            let resourceItem = new Resource({scene: this, resource})
            console.log('RESOURCE ITEM ', resourceItem)
        })
    }

    update() {
        this.player.update()
    }
}