## vue3组合式API案例

> 需求：用户仓库列表视图 + 搜索功能 + 筛选功能

### 1. vue2模式

> 1. 引入子组件RepositoriesList，RepositoriesFilters，RepositoriesSortBy
> 2. 实现上述需求功能

```js
// src/components/UserRepositories.vue

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { 
      type: String,
      required: true
    }
  },
  data () {
    return {
      repositories: [], // 【列表功能】
      filters: { ... }, // 【筛选功能】
      searchQuery: '' // 【搜索功能】
    }
  },
  computed: {
    filteredRepositories () { ... }, // 【筛选功能】
    repositoriesMatchingSearchQuery () { ... }, // 【搜索功能】
  },
  watch: {
    user: 'getUserRepositories' // 【列表功能】
  },
  methods: {
    getUserRepositories () {
      // 使用 `this.user` 获取用户仓库
    }, // 【列表功能】
    updateFilters () { ... }, // 【筛选功能】
  },
  mounted () {
    this.getUserRepositories() // 【列表功能】
  }
}
```

### 2. vue3模式

#### 2.1 不考虑组合式

> 单纯实现vue2 => vue3迁移

```js
// src/components/UserRepositories.vue

import { ref, computed, reactive, watch, onMounted, toRefs } from 'vue'
export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: { 
      type: String,
      required: true
    }
  },
  setup(){
    
    const searchQuery = ref(''); // 【搜索功能】
    const state = reactive({
      repositories: [], // 【列表功能】
      filters: {...} // 【筛选功能】
    });
      
    // 【筛选功能】
    const filteredRepositories = computed(()=>{...})
    // 【搜索功能】
    const repositoriesMatchingSearchQuery = computed(()=> {...})
    
    // 【列表功能】
   const getUserRepositories = ()=> {
      // 使用 `this.user` 获取用户仓库
    }, 
    // 【筛选功能】
    const updateFilters = ()=> {...}
         
    // 【列表功能】
    watch(()=>props.user, getUserRepositories);
    
    onMounted(()=>{
      // 【列表功能】
      getUserRepositories();
    });
   
    return {
      searchQuery,
      ...toRefs(state),
      filteredRepositories,
      repositoriesMatchingSearchQuery,
      getUserRepositories,
      updateFilters,
    }
  }
}
```

#### 2.2 考虑组合式API

**useUserRepositories**

```js
// useUserRepositories.js
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch } from 'vue'

export default function useUserRepositories(user) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```

**useRepositoryNameSearch**

```js
// useRepositoryNameSearch.js
import { ref, computed } from 'vue'

export default function useRepositoryNameSearch(repositories) {
  const searchQuery = ref('')
  const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(repository => {
      return repository.name.includes(searchQuery.value)
    })
  })

  return {
    searchQuery,
    repositoriesMatchingSearchQuery
  }
}
```

**UserRepositories组件**

> 高内聚低耦合

```js
// UserRepositories.vue
import { toRefs } from 'vue'
import useUserRepositories from '@/composables/useUserRepositories'
import useRepositoryNameSearch from '@/composables/useRepositoryNameSearch'
import useRepositoryFilters from '@/composables/useRepositoryFilters'

export default {
  components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { user } = toRefs(props)
		 // 【列表功能】
    const { repositories, getUserRepositories } = useUserRepositories(user)
	  // 【查询功能】
    const {
      searchQuery,
      repositoriesMatchingSearchQuery
    } = useRepositoryNameSearch(repositories)
 		// 【筛选功能】
    const {
      filters,
      updateFilters,
      filteredRepositories
    } = useRepositoryFilters(repositoriesMatchingSearchQuery)

    return {
      repositories: filteredRepositories,
      getUserRepositories,
      searchQuery,
      filters,
      updateFilters
    }
  }
}
```



