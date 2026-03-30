import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Shield, User, Trash2, UserPlus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Profile, AppRole } from '@/types/admin';
import { Badge } from '@/components/ui/badge';
import { z } from 'zod';

const newUserSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'La password deve avere almeno 6 caratteri'),
  fullName: z.string().min(2, 'Il nome deve avere almeno 2 caratteri'),
  role: z.enum(['admin', 'contributor', 'partner']),
});

export default function AdminUsers() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'contributor' as AppRole,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { isAdmin, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    fetchUsers();
  }, [isAdmin, navigate]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers((data || []) as Profile[]);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile caricare gli utenti.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: AppRole) => {
    // Prevent changing own role
    if (userId === profile?.user_id) {
      toast({
        title: 'Operazione non permessa',
        description: 'Non puoi modificare il tuo stesso ruolo.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: 'Ruolo aggiornato',
        description: 'Il ruolo dell\'utente è stato modificato.',
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile aggiornare il ruolo.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (user: Profile) => {
    // Prevent deleting self
    if (user.user_id === profile?.user_id) {
      toast({
        title: 'Operazione non permessa',
        description: 'Non puoi eliminare il tuo stesso account.',
        variant: 'destructive',
      });
      return;
    }

    if (!confirm(`Sei sicuro di voler eliminare l'utente "${user.email}"?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: 'Utente eliminato',
        description: 'L\'utente è stato rimosso.',
      });

      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Errore',
        description: 'Impossibile eliminare l\'utente.',
        variant: 'destructive',
      });
    }
  };

  const handleCreateUser = async () => {
    setFormErrors({});
    
    try {
      const validated = newUserSchema.parse(newUser);
      setIsCreating(true);

      // Create user via Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: validated.email,
        password: validated.password,
        options: {
          data: {
            full_name: validated.fullName,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          toast({
            title: 'Utente già registrato',
            description: 'Esiste già un account con questa email.',
            variant: 'destructive',
          });
        } else {
          throw signUpError;
        }
        return;
      }

      // Update the role if needed (profile is created automatically by trigger)
      if (authData.user && validated.role === 'admin') {
        // Wait a moment for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin' })
          .eq('user_id', authData.user.id);

        if (updateError) {
          console.error('Error updating role:', updateError);
        }
      }

      toast({
        title: 'Utente creato!',
        description: `${validated.fullName} è stato aggiunto come ${validated.role}.`,
      });

      setNewUser({ email: '', password: '', fullName: '', role: 'contributor' });
      setIsDialogOpen(false);
      
      // Refresh users list after a short delay
      setTimeout(fetchUsers, 1500);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) {
            errors[e.path[0] as string] = e.message;
          }
        });
        setFormErrors(errors);
      } else {
        console.error('Error creating user:', err);
        toast({
          title: 'Errore',
          description: 'Impossibile creare l\'utente.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsCreating(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout title="Gestione Utenti">
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca utente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Nuovo utente
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Aggiungi nuovo utente</DialogTitle>
                <DialogDescription>
                  Crea un nuovo account per un membro del team.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome completo</Label>
                  <Input
                    id="fullName"
                    placeholder="Mario Rossi"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  />
                  {formErrors.fullName && (
                    <p className="text-sm text-destructive">{formErrors.fullName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="mario@example.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                  {formErrors.email && (
                    <p className="text-sm text-destructive">{formErrors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                  {formErrors.password && (
                    <p className="text-sm text-destructive">{formErrors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Ruolo</Label>
                  <Select
                    value={newUser.role}
                    onValueChange={(value: AppRole) => setNewUser({ ...newUser, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="partner">Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annulla
                </Button>
                <Button onClick={handleCreateUser} disabled={isCreating}>
                  {isCreating ? 'Creazione...' : 'Crea utente'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Info card */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Admin:</strong> Accesso completo, può gestire utenti e eliminare contenuti.
              <br />
              <strong>Contributor:</strong> Può creare e modificare contenuti, ma non eliminarli né gestire utenti.
              <br />
              <strong>Partner:</strong> Accede all'area partner con listini, sconti e documentazione tecnica dedicata.
            </p>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Nessun utente trovato.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utente</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Ruolo</TableHead>
                    <TableHead>Registrato il</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.role === 'admin' ? (
                            <Shield className="h-4 w-4 text-primary" />
                          ) : (
                            <User className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="font-medium">
                            {user.full_name || 'Senza nome'}
                          </span>
                          {user.user_id === profile?.user_id && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              Tu
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(value: AppRole) =>
                            handleRoleChange(user.user_id, value)
                          }
                          disabled={user.user_id === profile?.user_id}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="contributor">Contributor</SelectItem>
                            <SelectItem value="partner">Partner</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(user.created_at).toLocaleDateString('it-IT')}
                      </TableCell>
                      <TableCell className="text-right">
                        {user.user_id !== profile?.user_id && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(user)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
