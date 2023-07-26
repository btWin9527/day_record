<template>
  <div>
    <div class="toolbar">
      <el-button @click="handleAceEditorChange">JSON</el-button>
      <el-button @click="undo">撤消</el-button>
      <el-button @click="redo">重做</el-button>
      <label for="input" class="insert">
        插入图片
        <input
            id="input"
            type="file"
            hidden
            @change="handleFileChange"
        />
      </label>

      <el-button style="margin-left: 10px;" @click="preview(false)">预览</el-button>
      <el-button @click="save">保存</el-button>
      <el-button @click="clearCanvas">清空画布</el-button>
      <el-button :disabled="!areaData.components.length" @click="compose">组合</el-button>
      <el-button
          :disabled="!curComponent || curComponent.isLock || curComponent.component != 'Group'"
          @click="decompose"
      >
        拆分
      </el-button>

      <el-button :disabled="!curComponent || curComponent.isLock" @click="lock">锁定</el-button>
      <el-button :disabled="!curComponent || !curComponent.isLock" @click="unlock">解锁</el-button>
      <el-button @click="preview(true)">截图</el-button>

      <div class="canvas-config">
        <span>画布大小</span>
        <input v-model="canvasStyleData.width">
        <span>*</span>
        <input v-model="canvasStyleData.height">
      </div>
      <div class="canvas-config">
        <span>画布比例</span>
        <input v-model="scale" @input="handleScaleChange"> %
      </div>
    </div>

    <!-- 预览 -->
    <!--    <Preview v-if="isShowPreview" :is-screenshot="isScreenshot" @close="handlePreviewChange"/>-->
    <!--    <AceEditor v-if="isShowAceEditor" @closeEditor="closeEditor"/>-->
  </div>
</template>

<script>
import {mapState} from 'vuex'
// import eventBus from '@/utils/eventBus'
// import {$} from '@/utils/utils'
// import changeComponentsSizeWithScale, {changeComponentSizeWithScale} from '@/utils/changeComponentsSizeWithScale'

export default {
  data() {
    return {
      isShowPreview: false,
      isShowAceEditor: false,
      timer: null,
      isScreenshot: false,
      scale: 100,
    }
  },
  computed: mapState([
    'componentData',
    'canvasStyleData',
    'areaData',
    'curComponent',
    'curComponentIndex',
  ]),
  created() {
    // eventBus.$on('preview', this.preview)
    // eventBus.$on('save', this.save)
    // eventBus.$on('clearCanvas', this.clearCanvas)

    // this.scale = this.canvasStyleData.scale
  },
  methods: {
    handleScaleChange() {

    },

    handleAceEditorChange() {
    },

    closeEditor() {
    },

    lock() {
    },

    unlock() {
    },

    compose() {
    },

    decompose() {
    },

    undo() {
    },

    redo() {
    },

    handleFileChange(e) {

    },

    preview(isScreenshot) {
    },

    save() {
    },

    clearCanvas() {
    },

    handlePreviewChange() {
    },
  },
}
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 15px 10px;
  white-space: nowrap;
  overflow-x: auto;
  background: #fff;
  border-bottom: 1px solid #ddd;

  .canvas-config {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    color: #606266;

    input {
      width: 50px;
      margin-left: 4px;
      outline: none;
      padding: 0 5px;
      border: 1px solid #ddd;
      color: #606266;
    }

    span {
      margin-left: 10px;
    }
  }

  .insert {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    margin-left: 10px;

    &:active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      outline: 0;
    }

    &:hover {
      background-color: #ecf5ff;
      color: #3a8ee6;
    }
  }
}
</style>
