/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.initialAxiom = "X";
        this.ruleF = ["FF"];
        this.ruleX = [
            "F[-X][X]F[-X]+FX",
            "F[^X]&X", 
            "F[/X][X]F[\\X]+X", 
        ];
        this.angleDegrees = 25.0;
        this.iterationsNum = 3;
        this.scaleFactor = 0.5;

        //Animation Values
        this.initAnimTime = 0.0;
        this.depth = 0.0;
    }

    doGenerate() {
        super.generate(
            this.initialAxiom,
            {
                "F": this.ruleF,
                "X": this.ruleX
            },
            this.angleDegrees,
            this.iterationsNum,
            this.scaleFactor
        );
    }

    startAnimation(t) {
        this.initAnimTime = t;

        this.doGenerate();

        this.update(t);
    }

    update(t) {
        if(this.depth >= this.axiom.length) {
            this.depth = 0.0;
            return false;
        }

        var deltaT = t - this.initAnimTime;
        this.depth = Math.min( (deltaT * this.axiom.length) / 1000, this.axiom.length);

        return true;
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        for (i=0; i<this.axiom.length; ++i){
            
            if(i >= this.depth) break;
            
            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "\\":
                    // rotacao em sentido positivo sobre o eixo dos XX
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;

                case "/":
                    // rotacao em sentido negativo sobre o eixo dos XX
                    this.scene.rotate(-this.angle, 1, 0, 0);
                    break;

                case "^":
                    // rotacao em sentido positivo sobre o eixo dos YY
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":
                    // rotacao em sentido negativo sobre o eixo dos YY
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        primitive.display();
                        this.scene.translate(0, -1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }

}