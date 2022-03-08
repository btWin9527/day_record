/**
 * 模拟实现useState
 */
let isMount = true; // 区分是否为首次渲染
let workInProgressHook = null; // 链表

// fiber实现异步执行操作，包含两个阶段 Reconciliation Phase 和 Commit Phase
// Reconciliation Phase(包含生命周期componentWillMount, componentWillReceiveProps, shouldComponentUpdate, componentWillUpdate)
// Commit Phase(包含生命周期componentDidMount, componentDidUpdate, componentWillUnmount)
const fiber = {
    // 保存该FunctionComponent对应的Hooks链表
    stateNode: App,
    // 指向App函数
    memoizedState: null
};

function useState(initialState) {
    let hook; // 链表结构，存储多个useState定义数据

    if (isMount) {
        // mount时为该useState生成hook
        hook = {
            // 保存hook对应的state
            memoizedState: initialState,
            // 与下一个Hook连接形成单向无环链表
            next: null,
            // 保存update的queue，即上文介绍的queue
            queue: {
                pending: null
            }
        };
        // 将hook插入fiber.memoizedState链表末尾
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook;
        } else {
            workInProgressHook.next = hook;
        }
        // 移动workInProgressHook指针
        workInProgressHook = hook;
    } else {
        // update时找到对应hook
        hook = workInProgressHook;
        // 移动workInProgressHook指针
        workInProgressHook = workInProgressHook.next;
    }
    // update执行前的初始state
    let baseState = hook.memoizedState;
    if (hook.queue.pending) {
        // 获取update环状单向链表中第一个update
        let firstUpdate = hook.queue.pending.next;

        do {
            // 执行update action
            const action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next;
            // 最后一个update执行完后跳出循环
        } while (firstUpdate !== hook.queue.pending.next)
        // 清空queue.pending
        hook.queue.pending = null;
    }
    // 将update action执行完后的state作为memoizedState
    hook.memoizedState = baseState;
    return [baseState, dispatchAction.bind(null, hook.queue)];

}

/**
 *
 * @param queue
 * @param action
 */
function dispatchAction(queue, action) {
    // 创建update 环状单向列表
    const update = {
        action,
        next: null
    }
    // 环状单向链表操作
    if (queue.pending === null) {
        // u0 -> u0 -> u0
        update.next = update;
    } else {
        // u0 -> u0
        // u1 -> u0 -> u1
        update.next = queue.pending.next;
        queue.pending.next = update;
    }

    queue.pending = update;
    // 更新视图
    schedule();
}

function schedule() {
    // 更新前将workInProgressHook重置为fiber保存的第一个Hook
    workInProgressHook = fiber.memoizedState;
    const app = fiber.stateNode();
    // 组件首次render为mount，以后再触发的更新为update
    isMount = false;
    return app
}

/**
 *
 * @description
 *  1. 通过用户行为产生更新，更新会造成组件render (更新分为mount和update)
 *      1. 调用ReactDOM.render会长生mount的更新,更新内容为useState的initialValue(即0)
 *      2. 调用click事件会产生一次update的更新，更新内容为num=>num+1
 *  2. 组件render时useState返回的num为更新后的结果
 */
function App() {
    const [num, updateNum] = useState(0);
    const [num1, updateNum1] = useState(100);

    console.log(`${isMount ? 'mount' : 'update'} num: `, num);
    console.log(`${isMount ? 'mount' : 'update'} num1: `, num1);

    return {
        click() {
            updateNum(num => num + 1);
        },
        focus() {
            updateNum1(num => num + 3);
        }
    }
}

window.app = schedule();