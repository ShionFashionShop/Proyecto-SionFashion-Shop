using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace REPOSITORIOS
{
    public interface IREPOSITORIO<T>
    {
        void Add(T entity);
        void Update(T entity);
        T GetById(int id);
        void Delete(int id);
        IEnumerable<T> GetAll();
    }
}
