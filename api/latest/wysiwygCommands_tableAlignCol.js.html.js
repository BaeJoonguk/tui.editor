tui.util.defineNamespace("fedoc.content", {});
fedoc.content["wysiwygCommands_tableAlignCol.js.html"] = "      <div id=\"main\" class=\"main\">\n\n\n\n    \n    <section>\n        <article>\n            <pre class=\"prettyprint source linenums\"><code>/**\n * @fileoverview Implements WysiwygCommand\n * @author Sungho Kim(sungho-kim@nhnent.com) FE Development Team/NHN Ent.\n * @author Junghwan Park(junghwan.park@nhnent.com) FE Development Team/NHN Ent.\n */\n\n\nimport CommandManager from '../commandManager';\nimport domUtil from '../domUtils';\n\n/**\n * AlignCol\n * Align selected column's text content to given direction\n * @exports AlignCol\n * @augments Command\n * @augments WysiwygCommand\n */\nconst AlignCol = CommandManager.command('wysiwyg', /** @lends AlignCol */{\n    name: 'AlignCol',\n    /**\n     * 커맨드 핸들러\n     * @param {WysiwygEditor} wwe WYsiwygEditor instance\n     * @param {string} alignDirection Align direction\n     */\n    exec(wwe, alignDirection) {\n        const sq = wwe.getEditor();\n        const range = sq.getSelection().cloneRange();\n        const selectionMgr = wwe.getManager('tableSelection');\n        const rangeInformation = getRangeInformation(range, selectionMgr);\n\n        sq.focus();\n\n        if (sq.hasFormat('TR')) {\n            sq.saveUndoState(range);\n\n            const $table = $(range.startContainer).parents('table');\n\n            const selectionInformation = getSelectionInformation($table, rangeInformation);\n\n            setAlignAttributeToTableCells($table, alignDirection, selectionInformation);\n        }\n        selectionMgr.removeClassAttrbuteFromAllCellsIfNeed();\n    }\n});\n\n/**\n * Set Column align\n * @param {jQuery} $table jQuery wrapped TABLE\n * @param {string} alignDirection 'left' or 'center' or 'right'\n * @param {{\n *     startColumnIndex: number,\n *     endColumnIndex: number,\n *     isDivided: boolean\n *     }} selectionInformation start, end column index and boolean value for whether range divided or not\n */\nfunction setAlignAttributeToTableCells($table, alignDirection, selectionInformation) {\n    const isDivided = selectionInformation.isDivided || false;\n    const start = selectionInformation.startColumnIndex;\n    const end = selectionInformation.endColumnIndex;\n    const columnLength = $table.find('tr').eq(0).find('td,th').length;\n\n    $table.find('tr').each((n, tr) => {\n        $(tr).children('td,th').each((index, cell) => {\n            if (isDivided &amp;&amp;\n                ((start &lt;= index &amp;&amp; index &lt;= columnLength) || (index &lt;= end))\n            ) {\n                $(cell).attr('align', alignDirection);\n            } else if ((start &lt;= index &amp;&amp; index &lt;= end)) {\n                $(cell).attr('align', alignDirection);\n            }\n        });\n    });\n}\n\n/**\n * Return start, end column index and boolean value for whether range divided or not\n * @param {jQuery} $table jQuery wrapped TABLE\n * @param {{startColumnIndex: number, endColumnIndex: number}} rangeInformation Range information\n * @returns {{startColumnIndex: number, endColumnIndex: number, isDivided: boolean}}\n */\nfunction getSelectionInformation($table, rangeInformation) {\n    const columnLength = $table.find('tr').eq(0).find('td,th').length;\n    const from = rangeInformation.from;\n    const to = rangeInformation.to;\n    let startColumnIndex, endColumnIndex, isDivided;\n\n    if (from.row === to.row) {\n        startColumnIndex = from.cell;\n        endColumnIndex = to.cell;\n    } else if (from.row &lt; to.row) {\n        if (from.cell &lt;= to.cell) {\n            startColumnIndex = 0;\n            endColumnIndex = columnLength - 1;\n        } else {\n            startColumnIndex = from.cell;\n            endColumnIndex = to.cell;\n            isDivided = true;\n        }\n    }\n\n    return {\n        startColumnIndex,\n        endColumnIndex,\n        isDivided\n    };\n}\n\n/**\n * Get range information\n * @param {Range} range Range object\n * @param {object} selectionMgr Table selection manager\n * @returns {object}\n */\nfunction getRangeInformation(range, selectionMgr) {\n    const selectedCells = selectionMgr.getSelectedCells();\n    let rangeInformation, startCell;\n\n    if (selectedCells.length) {\n        rangeInformation = selectionMgr.getSelectionRangeFromTable(selectedCells.first()[0],\n            selectedCells.last()[0]);\n    } else {\n        startCell = domUtil.isTextNode(range.startContainer) ?\n            $(range.startContainer).parent('td,th')[0] : range.startContainer;\n        rangeInformation = selectionMgr.getSelectionRangeFromTable(startCell, startCell);\n    }\n\n    return rangeInformation;\n}\n\nmodule.exports = AlignCol;\n</code></pre>\n        </article>\n    </section>\n\n\n\n</div>\n\n"