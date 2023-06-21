//编写一个函数来查找字符串数组中的最长公共前缀。
//
// 如果不存在公共前缀，返回空字符串 ""。
//
//
//
// 示例 1：
//
//
//输入：strs = ["flower","flow","flight"]
//输出："fl"
//
//
// 示例 2：
//
//
//输入：strs = ["dog","racecar","car"]
//输出：""
//解释：输入不存在公共前缀。
//
//
//
// 提示：
//
//
// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] 仅由小写英文字母组成
//
// Related Topics 字符串 👍 2009 👎 0

// 【标签】字符串
//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string[]} strs
 * @return {string}
 * @description
 */
function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return '';
    let ans = strs[0];
    // 遍历后面的字符串，依次将其与 ans 进行比较，两两找出公共前缀，最终结果即为最长公共前缀
    for (let i = 1; i < strs.length; i++) {
        let j = 0;
        for (; j < ans.length && j < strs[i].length; j++) {
            if (ans[j] !== strs[i][j]) {
                break;
            }
        }
        ans = ans.substring(0, j);
        // 如果查找过程中出现了 ans 为空的情况，则公共前缀不存在直接返回
        if (ans === '') {
            return ans
        }
    }
    return ans;
}

console.log(longestCommonPrefix(["dog", "racecar", "car"]))
//leetcode submit region end(Prohibit modification and deletion)
