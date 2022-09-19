import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import style from './DropdownEdit.module.scss';


// ATUALIZAR POST
    export default function DropdownEdit() {
        return (
          <DropdownButton variant= 'Warning' className={style.dropdownEdit} title="">
            <Dropdown.Item as="button" >Editar</Dropdown.Item>
            <Dropdown.Item as="button">Excluir</Dropdown.Item>
          </DropdownButton>
        );
    }