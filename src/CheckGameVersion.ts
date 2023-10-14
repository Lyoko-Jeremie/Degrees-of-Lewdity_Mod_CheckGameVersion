import type {LogWrapper} from "../../../dist-BeforeSC2/ModLoadController";
import type {SC2DataManager} from "../../../dist-BeforeSC2/SC2DataManager";
import type {Sc2EventTracerCallback} from "../../../dist-BeforeSC2/Sc2EventTracer";
import type {ModUtils} from "../../../dist-BeforeSC2/Utils";
import {isString} from 'lodash';

export class CheckGameVersion implements Sc2EventTracerCallback {
    private log: LogWrapper;

    constructor(
        public thisWindow: Window,
        public gSC2DataManager: SC2DataManager,
        public gModUtils: ModUtils,
    ) {
        this.log = this.gModUtils.getLogger();
        this.gSC2DataManager.getSc2EventTracer().addCallback(this);
    }

    checkGameVersion() {
        const v = window?.StartConfig?.version;
        if (!isString(v)) {
            console.error('[CheckGameVersion] checkGameVersion() StartConfig.version not string', v);
            this.log.error(`[CheckGameVersion] checkGameVersion() StartConfig.version not string: ${v}`);
            return;
        }
        const vv = v.split('-')[0];
        this.gSC2DataManager.getDependenceChecker().checkGameVersion(vv);
    }

    whenSC2StoryReady() {
        this.checkGameVersion();
    }

}

