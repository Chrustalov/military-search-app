import React from 'react'
import PostTableItem from './PostTableItem';

function PostTable({ missing_people }) {
  return (
    <div className="widget widget-missing-people">
      <div className="widget missing-people">
        <h3>Зниклі особи</h3>
      </div>
      <table className="table table-green">
        <thead>
          <tr>
            <th scope="col">Фото</th>
            <th scope="col">Ім'я</th>
            <th scope="col">Вік</th>
            <th scope="col">Регіон</th>
            <th scope="col">Відомості</th>
          </tr>
        </thead>
        <tbody>
          {missing_people.map((item) => (
            <PostTableItem key={item.title} {...item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostTable