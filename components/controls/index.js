import Size from './Size.js'
import Color from './Color.js'
import Tools from './Tools.js'
import Cursor from './Cursor.js'

export default function(context) {

    const size = Size(context)
    const tools = Tools(context)
    const color = Color(context)
    const cursor = Cursor(context);

    // const controls = [
    //     Size(context),
    //     Tools(context),
    //     Color(context),
    //     Cursor(context)
    // ]

    function updateAll() {
        size.update();
        tools.update();
        color.update();
        cursor.update();
    }
    
    return {
        updateAll,
        size,
        tools,
        color,
        cursor
    }
}