<template>
  
</template>

<script>
export default {
  name: 'CharacterRecommendation',
  data() {
    return {
      expandedIndex: null,
      selectedCharacter: null,
      characters: [
        {
          name: '艾薇雅·星歌',
          image: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.NirrTS62xmR_AsARBDDzMAHaEo?rs=1&pid=ImgDetMain',
          shortDesc: '星之魔女，掌握星辰魔法...',
          fullDesc: '详细角色背景故事：出生于星辉之夜的艾薇雅，自幼展现出惊人的魔法天赋...',
          tags: ['魔法', '主角', '奇幻']
        }
      ]
    }
  },
  methods: {
    toggleExpand(index) {
      this.expandedIndex = this.expandedIndex === index ? null : index
    },
    openModal(character) {
      this.selectedCharacter = character
      document.body.classList.add('modal-open')
    },
    closeModal() {
      this.selectedCharacter = null
      document.body.classList.remove('modal-open')
    }
  }
}
</script>
