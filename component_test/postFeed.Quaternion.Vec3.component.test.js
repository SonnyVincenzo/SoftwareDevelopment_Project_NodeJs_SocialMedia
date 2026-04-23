import { describe, it } from 'node:test';
import assert from 'node:assert';
import { Vec2, Vec3, Quaternion, ProjectVertex, ViewVertex } from "../public/js/postFeed.lib.js";

describe("Quaternion", () => {
    it("Rotate(vertex, quaternion)", () => {
        // i didnt know it actuelly go clockwise instead of counter clockwise rotation in lefthand coordinate
        const v = new Vec3(0, 1, 0);
        // rotate 90 degree clockwise surround x-axis
        let q = new Quaternion(0, 0, 0, 0, new Vec3(1, 0, 0), Math.PI / 2);
        let r = Quaternion.Rotate(v, q);
        // rotate 90 degree clockwise surround y-axis
        q = new Quaternion(0, 0, 0, 0, new Vec3(0, 1, 0), Math.PI / 2);
        r = Quaternion.Rotate(r, q);
        // rotate 90 degree clockwise surround z-axis
        q = new Quaternion(0, 0, 0, 0, new Vec3(0, 0, 1), Math.PI / 2);
        r = Quaternion.Rotate(r, q);
        // goes back to (0,1,0)
        const bx = Math.abs(v.x - r.x) < 0.001;
        const by = Math.abs(v.y - r.y) < 0.001;
        const bz = Math.abs(v.z - r.z) < 0.001;
        assert.ok(bx);
        assert.ok(by);
        assert.ok(bz);
    });
});
