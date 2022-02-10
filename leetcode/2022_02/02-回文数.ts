//给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
//
// 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是。
//
//
//
// 示例 1：
//
//
//输入：x = 121
//输出：true
//
//
// 示例 2：
//
//
//输入：x = -121
//输出：false
//解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
//
//
// 示例 3：
//
//
//输入：x = 10
//输出：false
//解释：从右向左读, 为 01 。因此它不是一个回文数。
//
//
// 示例 4：
//
//
//输入：x = -101
//输出：false
//
//
//
//
// 提示：
//
//
// -2³¹ <= x <= 2³¹ - 1
//
//
//
//
// 进阶：你能不将整数转为字符串来解决这个问题吗？
// Related Topics 数学 👍 1788 👎 0

// 【标签】数学 字符串
/**
 * @method isPalindrome 解法1（普通解法）
 * @param {number} x
 * @return {boolean}
 * @description 使用数组方式解决
 */
function isPalindrome(x: number): boolean {
    if (x < 0 || (x !== 0 && x % 10 === 0)) return false
    if (0 <= x && x < 10) return true
    // 先将整数转为字符串，然后将字符串分割为数组，
    // 只需要循环数组的一半长度进行判断对应元素是否相等即可
    let arr: string[] = x.toString().split('');
    let len: number = arr.length;
    for (let i = 0; i < len / 2; i++) {
        if (arr[i] !== arr[len - i - 1]) {
            return false;
        }
    }
    return true;
}

/**
 * @method isPalindrome2 解法2-了解（数学解法）
 * @param {number} x
 * @return {boolean}
 * @description 通过取整和取余操作获取整数中对应的数字进行比较
 */
function isPalindrome2(x: number): boolean {
    if (x < 0) return false;
    let div = 1;
    while (x / div >= 10) div *= 10;
    while (x > 0) {
        let left = x / div;
        let right = x % 10;
        if (left != right) return false;
        x = (x % div) / 10;
        div /= 100;
    }
    return true;
}

/**
 * @method isPalindrome3 解法3-了解（巧妙解法）
 * @param {number} x
 * @return {boolean}
 * @description 取出后半段数字进行翻转
 */
function isPalindrome3(x: number): boolean {
    if (x < 0 || (x % 10 == 0 && x != 0)) return false;
    let revertedNumber = 0;
    while (x > revertedNumber) {
        revertedNumber = revertedNumber * 10 + x % 10;
        x /= 10;
    }
    return x == revertedNumber || x == revertedNumber / 10;
}