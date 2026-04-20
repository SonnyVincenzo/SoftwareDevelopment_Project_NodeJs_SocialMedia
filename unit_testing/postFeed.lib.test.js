import {describe, it} from 'node:test';
import assert from 'node:assert';
import {Vec2, Vec3, Quaternion, ProjectVertex, ViewVertex} from "../public/js/postFeed.lib.js";
import { verify } from 'node:crypto';
const t_x = 234 + 100 * Math.random();
const t_y = 6754 + 100 * Math.random();
const t_z = 854 + 100 * Math.random();
const t_w = 112 + 100 * Math.random(); 
/*
describe("what", ()=>{
    it("should",()=>{
        assert.strictEqual(1, 1);
    });
    it("should",()=>{
        assert.strictEqual(2, 2);
    });
});
*/
describe("Vec2", ()=>{
    const v1 = new Vec2(t_x,t_y);
    const v2 = new Vec2(t_z,t_w);
    it("Magnitude(v)",()=>{
        const m = Vec2.Magnitude(v1);
        const answer = Math.sqrt(t_x**2 + t_y**2)
        assert.ok(m, answer);
    });
    it("Delta(vMinuend,vSubtrahend)",()=>{
        const d = Vec2.Delta(v1,v2);
        const ax = v1.x - v2.x;
        const ay = v1.y - v2.y;
        const answer = new Vec2(ax,ay);
        assert.strictEqual(d.x, answer.x);
        assert.strictEqual(d.y, answer.y);
    });
});
describe("Vec3", ()=>{
    const v1 = new Vec3(t_x,t_y,t_z)
    const v2 = new Vec3(t_z,t_y,t_w)
    const v3 = new Vec3(t_y,t_x,t_z)
    it("Normalize(v) & Magnitude(v)",()=>{
        const nv1 = Vec3.Normalize(v1);
        const nv2 = Vec3.Normalize(v2);
        const nv3 = Vec3.Normalize(v3);
        const mv1 = Vec3.Magnitude(nv1);
        const mv2 = Vec3.Magnitude(nv2);
        const mv3 = Vec3.Magnitude(nv3);
        const b = Math.abs(mv1-mv2) + Math.abs(mv3-mv2) + Math.abs(mv1-mv3) < 0.001;
        assert.ok(b);
    });
    it("Delta(vMinuend,vSubtrahend)",()=>{
        const d = Vec3.Delta(v1,v2);
        const ax = v1.x - v2.x;
        const ay = v1.y - v2.y;
        const az = v1.z - v2.z;
        const answer = new Vec3(ax,ay,az);
        assert.strictEqual(d.x, answer.x);
        assert.strictEqual(d.y, answer.y);
        assert.strictEqual(d.z, answer.z);
    });
    it("CrossProduct(v1,v2)",()=>{
        const mv1 = new Vec3(123, 321, 521);
        const mv2 = new Vec3(3, 4, 5);
        const answer = new Vec3((-479),948,(-471));
        const c = Vec3.CrossProduct(mv1,mv2);
        assert.strictEqual(c.x, answer.x);
        assert.strictEqual(c.y, answer.y);
        assert.strictEqual(c.z, answer.z);
    });
    it("DotProduct(v1,v2)",()=>{
        const mv1 = new Vec3(1641,23,666);
        const mv2 = new Vec3(5,2,4);
        const answer = 10915;
        const d = Vec3.DotProduct(mv1,mv2);
        assert.strictEqual(d, answer);
    });
});

describe("Quaternion", ()=>{
    it("HamiltonProduct(q1, q2)",()=>{
        const q1 = new Quaternion(1235, 6543, 34, 613);
        const q2 = new Quaternion(346, 435, 9876, 2);
        const h = Quaternion.HamiltonProduct(q1,q2);
        const answer = new Quaternion((-2755905), (-3252817), 12462193, 64818448);
        // too big number
        // tororant shall be bigger
        const bw = Math.abs(h.w-answer.w) < 3;
        const bx = Math.abs(h.x-answer.x) < 3;
        const by = Math.abs(h.y-answer.y) < 3;
        const bz = Math.abs(h.z-answer.z) < 3;
        assert.ok(bw);
        assert.ok(bx);
        assert.ok(by);
        assert.ok(bz);
    });
    it("Conjugate(q)",()=>{
        const q = new Quaternion(1,2,3,4);
        const c = Quaternion.Conjugate(q);
        const answer = new Quaternion(1,(-2),(-3),(-4));
        assert.strictEqual(c.w, answer.w);
        assert.strictEqual(c.x, answer.x);
        assert.strictEqual(c.y, answer.y);
        assert.strictEqual(c.z, answer.z);
    });
    it("Rotate(vertex, quaternion)",()=>{
        // i didnt know it actuelly go clockwise instead of counter clockwise rotation in lefthand coordinate
        const v = new Vec3(0,1,0);
        // rotate 90 degree clockwise surround x-axis
        let q = new Quaternion(0,0,0,0,new Vec3(1,0,0), Math.PI / 2);
        let r = Quaternion.Rotate(v,q);
        // rotate 90 degree clockwise surround y-axis
        q = new Quaternion(0,0,0,0,new Vec3(0,1,0), Math.PI / 2);
        r = Quaternion.Rotate(r,q);
        // rotate 90 degree clockwise surround z-axis
        q = new Quaternion(0,0,0,0,new Vec3(0,0,1), Math.PI / 2);
        r = Quaternion.Rotate(r,q);
        // goes back to (0,1,0)
        const bx = Math.abs(v.x-r.x) < 0.001;
        const by = Math.abs(v.y-r.y) < 0.001;
        const bz = Math.abs(v.z-r.z) < 0.001;
        assert.ok(bx);
        assert.ok(by);
        assert.ok(bz);
    });
});