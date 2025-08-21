<template>
    <el-card>
        <div class="mt">
            <span class="tltle">文章类型：</span>
            <el-tag :type="currentIndex[0] == -1 ? 'primary' : 'info'" class="mr"
                @click="handleLegacySelectEvents(-1, 0, '')">全部</el-tag>
            <el-tag class="mr" :type="currentIndex[0] == index ? 'primary' : 'info'"
                v-for="(value, index) in TypeList.type" :key="value"
                @click="handleLegacySelectEvents(index, 0, value)">{{
                    value }}</el-tag>
        </div>
        <div class="mt">
            <span class="tltle">重要程度：</span>
            <el-tag class="mr" :type="currentIndex[1] == -1 ? 'primary' : 'info'"
                @click="handleLegacySelectEvents(-1, 1, '')">全部</el-tag>
            <el-tag class="mr" v-for="(value, index) in TypeList.important" :key="value"
                :type="currentIndex[1] == index ? 'primary' : 'info'"
                @click="handleLegacySelectEvents(index, 1, value)">{{ value
                }}</el-tag>
        </div>
        <div class="mt">
            <span class="tltle">发布渠道：</span>
            <el-tag :type="currentIndex[2] == -1 ? 'primary' : 'info'" class="mr"
                @click="handleLegacySelectEvents(-1, 2, '')">全部</el-tag>
            <el-tag class="mr" v-for="(value, index) in TypeList.publish" :key="value"
                :type="currentIndex[2] == index ? 'primary' : 'info'"
                @click="handleLegacySelectEvents(index, 2, value)">{{ value
                }}</el-tag>
        </div>
        <el-divider></el-divider>
        <div class="mt">
            <span class="tltle">已选</span>
            <el-tag type="success" disable-transitions class="mr" @close="handleclose(item.num)" closable
                v-for="item in selectedList" :key="item.name">{{ item.name }}
            </el-tag>
        </div>
    </el-card>
    <el-button type="primary" class="mt mb" @click="exportToHtml">导出富文本岛html文件</el-button>
    <Editor
       v-model="editorContent"
       api-key="xvbamfm2vokka8qoim9r801qtdlldskjschd51yha7zhuusp"
      :init="{
        language:'zh_CN',
        plugins: 'lists link image table code help wordcount'
      }"
    />
    <el-button type="primary" @click="handleSubmit">提交文章内容</el-button>
</template>
<script lang="ts" setup>
import { TypeListApi } from '@/api/document';
import { ref, onMounted } from 'vue';
import Editor from '@tinymce/tinymce-vue';
interface ListType {
    type: string[],
    important: string[],
    publish: string[]
}
interface SelectType {
    name: string,
    num: number
}
const currentIndex = ref([-1, -1, -1])
const handleLegacySelectEvents = (index: number, number: number, value: string) => {
    currentIndex.value[number] = index
    const ind: number = selectedList.value.findIndex((item: SelectType) => item.num === number)
    if (!value) {
        selectedList.value = selectedList.value.filter((item: SelectType) => item.num !== number)
    } else {
        if (ind === -1) {
            selectedList.value.push({ name: value, num: number })
        } else {
            selectedList.value[ind] = { name: value, num: number }
        }
    }

}

const TypeList = ref<ListType>({
    type: [],
    important: [],
    publish: []
})
const selectedList = ref<SelectType[]>([
     
])
const handleclose = (num: number) => {
    selectedList.value = selectedList.value.filter((item: SelectType) => item.num !== num)
    currentIndex.value[num] = -1
}
const handleSubmit = () => {
    console.log(selectedList.value,editorContent.value)
}
const editorContent = ref('')
const exportToHtml = () => {
    const blob = new Blob([editorContent.value], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.html';
    link.click();
    URL.revokeObjectURL(link.href);
}
onMounted(async () => {
    const { data } = await TypeListApi()
    TypeList.value = data
})
</script>
<style lang="less" scoped>
.tltle {
    display: inline-block;
    width: 80px;
    font-size: 14px;
}

.el-tag {
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>