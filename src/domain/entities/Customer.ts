import { BaseEntity, BaseEntityProps } from './BaseEntity';
import { Group, GroupProps } from './Group';

export type CustomerProps = BaseEntityProps & {
  name: string;
  email: string;
  senha: string;
  group: GroupProps;
};

export class Customer extends BaseEntity {
  private name: string;
  private email: string;
  private senha: string;
  private group: Group;

  constructor(props: CustomerProps) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.senha = props.senha;
    this.group = new Group(props.group);
  }
}
