import * as THREE from "three";
import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils";

const textureLoader = new THREE.TextureLoader ();
// const texture = textureLoader.load("/src/assets/textures/bamboo-wood-semigloss-albedo.png");
const texture = textureLoader.load("dist/assets/ZebranoVeneer_512_albedo.png");
const roughness = textureLoader.load("dist/assets/ZebranoVeneer_512_roughness.png");
const normal = textureLoader.load("dist/assets/ZebranoVeneer_512_normal.png")
const textureD = textureLoader.load("dist/assets/Wenge_512_albedo.png");
const roughnessD = textureLoader.load("dist/assets/Wenge_512_roughness.png");
const normalD = textureLoader.load("dist/assets/Wenge_512_normal.png")

export default class Piece {
    constructor( dark, box, hollow, tall) {
        this.tall = tall;
        this.dark = dark;
        this.hollow = hollow;
        this.box = box;
        this.selected = false;
        this.model = this.initModel();
        // this.hollowTop = this.solid ? null : this.initHollowTop();
        // if (!this.solid) {
        //     this.model.setAttribute("position", [0,0,0]);
        //     this.hollowTop.setAttribute("position", [0, (this.tall ? 3 : 1.5), 0]);
        //     this.model = BufferGeometryUtils.mergeBufferGeometries([this.model, this.hollowTop]);
        //     console.log (this.model)
        // }      
    }

    initModel() {
        let geometry = this.box ?
            new THREE.BoxGeometry(3, (this.tall ? 9 : 4.5), 3) :
            new THREE.CylinderGeometry(1.5, 1.5, (this.tall ? 9 : 4.5), 100);
        // if (this.hollow) {
        //     const sphereGeo = new THREE.SphereGeometry (.4, 200, 200, 0, Math.PI*2, Math.PI/2, Math.PI);
        //     sphereGeo.setAttribute("position", [0, (this.tall ? 3 : 1.5), 0]);
        //     geometry = BufferGeometryUtils.mergeBufferGeometries([geometry, sphereGeo]);
        // }
        
        const material = this.dark ?
            new THREE.MeshStandardMaterial( { map: textureD, normalMap: normalD, roughnessMap: roughnessD} ) :
            new THREE.MeshStandardMaterial( { map: texture, normalMap: normal, roughnessMap: roughness} );
        return new THREE.Mesh( geometry, material );
    }

    
}