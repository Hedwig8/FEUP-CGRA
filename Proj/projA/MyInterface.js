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
        
        var obj = this;

        this.gui.add(this.scene, 'displayAxis').name("Display Axis");
        //this.gui.add(this.scene, 'scaleFactor', 0.1, 10.0).name("Scale");

        //this.gui.add(this.scene, 'displayDay').name('Day');
        //this.gui.add(this.scene, 'displayNight').name('Night');
        this.gui.add(this.scene, 'ambientLight', this.scene.ambientLight).name('Select Ambient');



        var lights = this.gui.addFolder('Lights');
        lights.add(this.scene.lights[0], 'enabled').name("Day Light");
        lights.add(this.scene.lights[1], 'enabled').name("Night Light");
        lights.add(this.scene.lights[2], 'enabled').name("Bonfire Light");

        return true;
    }
}