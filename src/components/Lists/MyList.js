import { memo } from 'react'
import { isEqual } from 'lodash'

//memo: avoid render objects previously rendered, only new
const Li = memo(({ children }) => {
  console.log(`renderizando ${children}`)
  return (
    <li>
      {children}
    </li>
  )
}, isEqual)  //when use children like an arrays of object, they must compare with isEqual

const MyList = ({ data }) => {
  console.log('renderizando lista')
  return (
    <ul>
      {data.map(x =>
        <Li key={x.name + x.lastname}>
          {x.name} {x.lastname}
        </Li>
      )}
    </ul>
  )
}

export default memo(MyList)  //use memoization
