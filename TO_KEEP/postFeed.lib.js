export class Vec2 {
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    static Magnitude(v){
        const px = Math.pow(v.x,2);
        const py = Math.pow(v.y,2);
        const magnitude = Math.sqrt(px+py);
        return magnitude;
    }
    static Delta(vMinuend,vSubtrahend){
        const dx = vMinuend.x - vSubtrahend.x;
        const dy = vMinuend.y - vSubtrahend.y;
        return new Vec2(dx,dy);
    }
}
export class Vec3 {
    constructor(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static Normalize(v){
        const px = Math.pow(v.x,2);
        const py = Math.pow(v.y,2);
        const pz = Math.pow(v.z,2);
        const magnitude = Math.sqrt(px+py+pz);
        const newX = v.x/magnitude;
        const newY = v.y/magnitude;
        const newZ = v.z/magnitude;
        return new Vec3(newX,newY,newZ);
    }
    static Delta(vMinuend, vSubtrahend) {
        // probably wont be needed
        const dx = vMinuend.x - vSubtrahend.x;
        const dy = vMinuend.y - vSubtrahend.y;
        const dz = vMinuend.z - vSubtrahend.z;
        return new Vec3(dx,dy,dz);
    }
    static CrossProduct(v1,v2) {
        const nx = v1.y * v2.z - v1.z * v2.y;
        const ny = - v1.x * v2.z + v1.z * v2.x;
        const nz = v1.x * v2.y - v1.y * v2.x;
        return new Vec3(nx,ny,nz);
    }
    static DotProduct(v1,v2){
        const mx = v1.x * v2.x;
        const my = v1.y * v2.y;
        const mz = v1.z * v2.z;
        return mx + my + mz;
    }
    static Magnitude(v){
        const px = Math.pow(v.x,2);
        const py = Math.pow(v.y,2);
        const pz = Math.pow(v.z,2);
        const magnitude = Math.sqrt(px+py+pz);
        return magnitude;
    }
}

// trackball rotation is perfect for this task
export class Quaternion {
    constructor(w, x, y, z, axis = null, radian = null) {
        if (axis && radian !== null) {
            // axis-angle constructor
            const halfRadian = radian / 2;
            this.w = Math.cos(halfRadian);
            this.x = axis.x * Math.sin(halfRadian);
            this.y = axis.y * Math.sin(halfRadian);
            this.z = axis.z * Math.sin(halfRadian);
        } else {
            // standard constructor
            this.w = w;
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
    static HamiltonProduct(q1, q2){
        // composition of two rotation
        const w = q1.w*q2.w - q1.x*q2.x - q1.y*q2.y - q1.z*q2.z;
        const x = q1.w*q2.x + q1.x*q2.w + q1.y*q2.z - q1.z*q2.y;
        const y = q1.w*q2.y - q1.x*q2.z + q1.y*q2.w + q1.z*q2.x;
        const z = q1.w*q2.z + q1.x*q2.y - q1.y*q2.x + q1.z*q2.w;
        return new Quaternion(w,x,y,z);
    }
    static Conjugate(q){
        return new Quaternion(q.w,-q.x,-q.y,-q.z);
    }
    static Rotate(vertex, quaternion) {
        const v = new Quaternion(0, vertex.x, vertex.y, vertex.z);
        const step1 = Quaternion.HamiltonProduct(quaternion, v);
        const step2 = Quaternion.Conjugate(quaternion);
        const step3 = Quaternion.HamiltonProduct(step1, step2);
        const result = step3;
        return new Vec3(result.x, result.y, result.z);
    }
}

// https://github.com/yuzekesu/test_Without_D3DXMath/blob/master/New_Window/Float4x4.cpp
// checkout my repo if you have interest in 3d projection too
export function ProjectVertex(vertex, fov, aspectRatio, nearPlane, farPlane) {
    const s = 1.0 / Math.tan(fov / 2);
    
    // matrix multiplication on the vector
    const x = (s / aspectRatio) * vertex.x;
    const y = s * vertex.y;
    // no depth needed
    // const z = (farPlane / (farPlane - nearPlane)) * vertex.z - (farPlane * nearPlane / (farPlane - nearPlane));
    // actuelly, since we are not using matices here, we can actuelly do
    // const z = vertex.z;
    // to save the depth
    const w = vertex.z;
    
    const x2d = x / w;
    const y2d = y / w;
    
    return new Vec2(x2d,y2d);
}

// just want to shift a little bit from the origin
// since the camera is on the origin
export function ViewVertex(vertex, zShift) {
    return new Vec3(vertex.x,vertex.y,vertex.z + zShift);
}