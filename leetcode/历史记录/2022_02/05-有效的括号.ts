//给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
//
// 有效字符串需满足：
//
//
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
//
//
//
//
// 示例 1：
//
//
//输入：s = "()"
//输出：true
//
//
// 示例 2：
//
//
//输入：s = "()[]{}"
//输出：true
//
//
// 示例 3：
//
//
//输入：s = "(]"
//输出：false
//
//
// 示例 4：
//
//
//输入：s = "([)]"
//输出：false
//
//
// 示例 5：
//
//
//输入：s = "{[]}"
//输出：true
//
//
//
// 提示：
//
//
// 1 <= s.length <= 10⁴
// s 仅由括号 '()[]{}' 组成
//
// Related Topics 栈 字符串 👍 2949 👎 0

// 【标签】 栈 字符串
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @method isValid 栈操作实现
 * @param {string} s
 * @return {boolean}
 * @description
 */
function isValid(s: string): boolean {
    const map: Map<string, string> = new Map([
        [')', '('],
        [']', '['],
        ['}', '{']
    ]);
    const stack = [];
    for (const ch of s) {
        if (map.has(ch)) {
            if (!stack.length || stack[stack.length - 1] !== map.get(ch)) {
                return false
            }
            stack.pop()
        } else {
            stack.push(ch)
        }
    }
    return !stack.length
}

//leetcode submit region end(Prohibit modification and deletion)
