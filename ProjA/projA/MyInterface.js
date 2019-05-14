/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        this.gui.add(this.scene, 'viewTextures').name('Enable Textures');

        //this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name("Scale");
        //this.gui.add(this.scene, 'displayDay').name('Day');
        //this.gui.add(this.scene, 'displayNight').name('Night');
        this.gui.add(this.scene, 'ambientLight', this.scene.ambientLight).name('Select Ambient');
        

        return true;
    }
}